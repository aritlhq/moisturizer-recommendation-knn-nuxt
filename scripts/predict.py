import sys
import os
import json
import pandas as pd
import joblib

def load_model_and_data(script_dir):
    """
    Load trained model, encoder, dan dataset metadata
    """
    model_path = os.path.join(script_dir, 'knn_model.joblib')
    encoder_path = os.path.join(script_dir, 'encoder.joblib')
    metadata_path = os.path.join(script_dir, 'dataset_metadata.joblib')
    products_path = os.path.join(script_dir, 'products.json')
    
    # Check if all files exist
    missing_files = []
    if not os.path.exists(model_path):
        missing_files.append('knn_model.joblib')
    if not os.path.exists(encoder_path):
        missing_files.append('encoder.joblib')
    if not os.path.exists(metadata_path):
        missing_files.append('dataset_metadata.joblib')
    
    if missing_files:
        print(json.dumps({
            "error": f"Model files not found: {', '.join(missing_files)}. Please run train_model.py first."
        }), file=sys.stderr)
        sys.exit(1)
    
    # Load model dan encoder
    model = joblib.load(model_path)
    encoder = joblib.load(encoder_path)
    metadata = joblib.load(metadata_path)
    
    # Load products mapping (jika ada)
    products_mapping = None
    if os.path.exists(products_path):
        with open(products_path, 'r', encoding='utf-8') as f:
            products_mapping = json.load(f)
    
    return model, encoder, metadata, products_mapping

def get_recommendations(model, encoder, user_input, k=5):
    """
    Get top-k recommendations untuk user input
    
    Args:
        model: Trained KNN model
        encoder: Fitted OneHotEncoder
        user_input: Dict dengan keys: skin_type, product_type, main_ingredient
        k: Jumlah rekomendasi (default: 5)
    
    Returns:
        indices: Array of indices untuk k nearest neighbors
        distances: Array of distances untuk k nearest neighbors
    """
    # Convert input ke DataFrame
    input_df = pd.DataFrame([{
        'skin_type': user_input['skin_type'],
        'product_type': user_input['product_type'],
        'main_ingredient': user_input['main_ingredient']
    }])
    
    # One-Hot Encoding
    input_encoded = encoder.transform(input_df)
    
    # Predict dengan KNN
    distances, indices = model.kneighbors(input_encoded, n_neighbors=k)
    
    return indices[0], distances[0]

def map_indices_to_product_ids(indices, metadata, products_mapping):
    """
    Map model indices ke product IDs di database
    
    Args:
        indices: Array of model indices
        metadata: Dataset metadata dengan row_indices
        products_mapping: Array of products dari database dengan IDs
    
    Returns:
        product_ids: Array of product IDs
    """
    product_ids = []
    row_indices = metadata.get('row_indices', [])
    
    if products_mapping:
        # Jika ada products.json, gunakan mapping langsung
        for idx in indices:
            if idx < len(products_mapping):
                product_ids.append(products_mapping[idx]['id'])
    else:
        # Fallback: gunakan row_indices sebagai ID offset
        # Ini assume import sequential dan ID dimulai dari 1
        # NOTE: Ini bisa tidak akurat jika ada data yang di-skip saat import
        for idx in indices:
            if idx < len(row_indices):
                # row_index dari CSV (1-based) biasanya match dengan database ID
                # Tapi ini heuristic, bukan exact match
                estimated_id = idx + 1  # Assume sequential
                product_ids.append(estimated_id)
    
    return product_ids

def main():
    """
    Main prediction pipeline
    """
    # Parse command line arguments
    if len(sys.argv) < 4:
        print(json.dumps({
            "error": "Usage: python predict.py <skin_type> <product_type> <main_ingredient>"
        }), file=sys.stderr)
        sys.exit(1)
    
    skin_type = sys.argv[1]
    product_type = sys.argv[2]
    main_ingredient = sys.argv[3]
    
    # Load model dan data
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model, encoder, metadata, products_mapping = load_model_and_data(script_dir)
    
    # Prepare user input
    user_input = {
        'skin_type': skin_type,
        'product_type': product_type,
        'main_ingredient': main_ingredient
    }
    
    try:
        # Get recommendations
        indices, distances = get_recommendations(model, encoder, user_input, k=5)
        
        # Map indices to product IDs
        product_ids = map_indices_to_product_ids(indices, metadata, products_mapping)
        
        # Output sebagai JSON array ke stdout (akan di-parse oleh Express.js)
        print(json.dumps(product_ids))
        
    except Exception as e:
        print(json.dumps({
            "error": f"Prediction failed: {str(e)}"
        }), file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
