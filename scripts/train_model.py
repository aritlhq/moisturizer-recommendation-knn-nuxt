"""
train_model.py
Script untuk training model KNN menggunakan dataset moisturizer

Author: Abdullah Rendra Zuriansyah
Usage: python train_model.py
"""

import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
import joblib
import os
import sys

# Fix encoding untuk Windows console
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def parse_dataset(csv_path):
    """
    Parse dataset.csv dengan mixed delimiter (semicolon dan comma)
    Format: Type;Name;Brand;Link,Tipe_Kulit,Kandungan_Utama
    """
    print(f"📂 Loading dataset dari: {csv_path}")
    
    rows = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
        # Skip header
        for i, line in enumerate(lines[1:], start=2):
            line = line.strip()
            if not line:
                continue
                
            try:
                # Split by semicolon untuk Type, Name, Brand, Link
                parts = line.split(';')
                
                if len(parts) >= 4:
                    # Parse bagian terakhir: Link,Tipe_Kulit,Kandungan_Utama
                    last_part_split = parts[3].split(',')
                    
                    if len(last_part_split) >= 3:
                        product_type = parts[0].strip()
                        name = parts[1].strip()
                        brand = parts[2].strip()
                        link = last_part_split[0].strip()
                        skin_type = last_part_split[1].strip()
                        ingredient = last_part_split[2].strip()
                        
                        # Skip jika ada field kosong atau product_type terlalu panjang (corrupt data)
                        if (product_type and name and brand and skin_type and ingredient 
                            and len(product_type) < 100):
                            
                            rows.append({
                                'product_type': product_type,
                                'name': name,
                                'brand': brand,
                                'link': link,
                                'skin_type': skin_type,
                                'main_ingredient': ingredient,
                                'row_index': i
                            })
            except Exception as e:
                print(f"⚠️  Warning: Skip baris {i} - {str(e)}")
                continue
    
    df = pd.DataFrame(rows)
    print(f"✅ Berhasil load {len(df)} produk\n")
    return df

def train_knn_model(df, k=5):
    """
    Training KNN model dengan One-Hot Encoding
    
    Args:
        df: DataFrame dengan kolom product_type, skin_type, main_ingredient
        k: Jumlah tetangga terdekat (default: 5)
    
    Returns:
        model: Trained NearestNeighbors model
        encoder: Fitted OneHotEncoder
        feature_names: List nama fitur setelah encoding
    """
    print("🔧 Mempersiapkan data untuk training...")
    
    # Fitur kategorikal yang akan di-encode
    features = ['skin_type', 'product_type', 'main_ingredient']
    X = df[features].copy()
    
    print(f"📊 Unique values per fitur:")
    for col in features:
        unique_vals = X[col].unique()
        print(f"   - {col}: {len(unique_vals)} kategori → {sorted(unique_vals)}")
    
    # One-Hot Encoding
    print(f"\n🧮 Melakukan One-Hot Encoding...")
    encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
    X_encoded = encoder.fit_transform(X)
    
    feature_names = encoder.get_feature_names_out(features)
    print(f"✅ Encoding selesai: {X_encoded.shape[1]} fitur numerik\n")
    
    # Training KNN model
    print(f"🤖 Training KNN model (k={k})...")
    model = NearestNeighbors(n_neighbors=k, metric='euclidean', algorithm='auto')
    model.fit(X_encoded)
    print(f"✅ Training selesai!\n")
    
    return model, encoder, feature_names

def save_model(model, encoder, df, output_dir='./'):
    """
    Save model, encoder, dan metadata ke file
    """
    print("💾 Menyimpan model dan encoder...")
    
    model_path = os.path.join(output_dir, 'knn_model.joblib')
    encoder_path = os.path.join(output_dir, 'encoder.joblib')
    metadata_path = os.path.join(output_dir, 'dataset_metadata.joblib')
    
    # Save model dan encoder
    joblib.dump(model, model_path)
    joblib.dump(encoder, encoder_path)
    
    # Save metadata (row_index untuk mapping ke product ID di database)
    # Karena dataset.csv tidak punya ID, kita pakai row_index sebagai identifier
    metadata = {
        'row_indices': df['row_index'].tolist(),
        'total_products': len(df),
        'features': ['skin_type', 'product_type', 'main_ingredient']
    }
    joblib.dump(metadata, metadata_path)
    
    print(f"✅ Model disimpan: {model_path}")
    print(f"✅ Encoder disimpan: {encoder_path}")
    print(f"✅ Metadata disimpan: {metadata_path}\n")

def main():
    """
    Main training pipeline
    """
    print("\n" + "="*60)
    print("🚀 KNN MODEL TRAINING - MOISTURIZER RECOMMENDATION")
    print("="*60 + "\n")
    
    # Path ke dataset (relatif dari scripts/)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(script_dir, '../../dataset.csv')
    
    if not os.path.exists(dataset_path):
        print(f"❌ Error: dataset.csv tidak ditemukan di {dataset_path}")
        sys.exit(1)
    
    # 1. Load dan parse dataset
    df = parse_dataset(dataset_path)
    
    if len(df) == 0:
        print("❌ Error: Tidak ada data yang berhasil di-load!")
        sys.exit(1)
    
    # 2. Training model
    model, encoder, feature_names = train_knn_model(df, k=5)
    
    # 3. Save model
    save_model(model, encoder, df, output_dir=script_dir)
    
    # 4. Test prediction (sanity check)
    print("🧪 Testing prediction dengan sample input...")
    test_input = pd.DataFrame([{
        'skin_type': 'Normal',
        'product_type': 'Moisturizer Gel',
        'main_ingredient': 'Ceramide'
    }])
    
    test_encoded = encoder.transform(test_input)
    distances, indices = model.kneighbors(test_encoded)
    
    print(f"✅ Test prediction berhasil!")
    print(f"   Input: {test_input.iloc[0].to_dict()}")
    print(f"   Top 5 nearest indices: {indices[0].tolist()}")
    print(f"   Distances: {distances[0].tolist()}\n")
    
    print("="*60)
    print("✅ MODEL TRAINING SELESAI!")
    print("="*60 + "\n")
    print("📌 Next step: Jalankan predict.py untuk testing rekomendasi")
    print("   Contoh: python predict.py Normal 'Moisturizer Gel' Ceramide\n")

if __name__ == '__main__':
    main()
