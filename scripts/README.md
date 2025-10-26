# Python ML Scripts - KNN Recommendation System

Machine Learning scripts untuk sistem rekomendasi moisturizer menggunakan algoritma **K-Nearest Neighbors (KNN)**.

## 📁 Files

| File | Deskripsi |
|------|-----------|
| `train_model.py` | Script untuk training KNN model dari dataset.csv |
| `predict.py` | Script untuk inference (dipanggil oleh Express.js) |
| `requirements.txt` | Python dependencies |
| `setup_python.ps1` | Automated setup script (PowerShell) |
| `setup_python.bat` | Automated setup script (CMD) |
| `importData.js` | Node.js script untuk import CSV ke MySQL + export products.json |
| `createAdmin.js` | Node.js script untuk membuat admin user |

## 🤖 Cara Kerja Algoritma KNN

### Overview

**K-Nearest Neighbors (KNN)** adalah algoritma supervised learning yang bekerja dengan prinsip **"similarity"** (kemiripan).

```
User Input:
- Skin Type: Normal
- Product Type: Moisturizer Gel  
- Main Ingredient: Ceramide

↓ One-Hot Encoding

[0, 1, 0, 1, 0, 0, 1, 0, 0] (vector numerik)

↓ KNN Algorithm

Cari 5 produk terdekat (Euclidean Distance)

↓ Output

[Product ID: 123, 456, 789, 234, 567]
```

### Detail Proses

1. **Data Preparation (train_model.py)**
   - Load dataset.csv (2257 produk)
   - Extract fitur kategorikal: `skin_type`, `product_type`, `main_ingredient`
   - **One-Hot Encoding**: Convert kategori → vector numerik
     ```
     Contoh:
     skin_type: "Normal" → [0, 1, 0]  (Berminyak=0, Normal=1, Kering=0)
     product_type: "Moisturizer Gel" → [1, 0]  (Gel=1, Cream=0)
     main_ingredient: "Ceramide" → [0, 1, 0, 0, 0, 0]
     
     Final vector: [0, 1, 0, 1, 0, 0, 1, 0, 0] (concatenated)
     ```
   - Fit KNN model dengan `n_neighbors=5`, metric `euclidean`
   - Save model, encoder, dan metadata ke file `.joblib`

2. **Prediction (predict.py)**
   - Terima user input dari Express.js (command-line args)
   - Load trained model + encoder
   - Encode user input dengan OneHotEncoder yang sama
   - Predict dengan `model.kneighbors()` → dapat 5 produk terdekat
   - Return product IDs sebagai JSON array

3. **Express Integration**
   - Express.js panggil `predict.py` via `child_process.spawn()`
   - Parse output JSON dari Python
   - Query detail produk dari MySQL berdasarkan IDs
   - Return hasil ke frontend

## 🚀 Setup & Training

### Otomatis (Recommended)

**PowerShell:**
```powershell
cd server/scripts
powershell -ExecutionPolicy Bypass -File setup_python.ps1
```

**CMD:**
```cmd
cd server\scripts
setup_python.bat
```

### Manual

**1. Buat Virtual Environment**
```bash
cd server/scripts
python -m venv venv
```

**2. Aktivasi Virtual Environment**

**PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

**CMD:**
```cmd
venv\Scripts\activate.bat
```

**3. Install Dependencies**
```bash
pip install -r requirements.txt
```

**4. Train Model**
```bash
python train_model.py
```

Expected output:
```
🚀 KNN MODEL TRAINING - MOISTURIZER RECOMMENDATION
✅ Berhasil load 2257 produk
📊 Unique values per fitur:
   - skin_type: 3 kategori → ['Berminyak', 'Kering', 'Normal']
   - product_type: 2 kategori → ['Moisturizer Cream', 'Moisturizer Gel']
   - main_ingredient: 6 kategori → ['Centella Asiatica', 'Ceramide', ...]
✅ Encoding selesai: 11 fitur numerik
✅ Training selesai!
✅ MODEL TRAINING SELESAI!
```

Model files yang dihasilkan:
- `knn_model.joblib` - Trained KNN model
- `encoder.joblib` - OneHotEncoder (fitted)
- `dataset_metadata.joblib` - Metadata (row indices, features)

## 🧪 Testing Prediction

### Test Manual (Python)

```bash
# Format: python predict.py <skin_type> <product_type> <main_ingredient>
python predict.py Normal "Moisturizer Gel" Ceramide
```

Expected output (JSON array of product IDs):
```json
[123, 456, 789, 234, 567]
```

### Test via Express.js API

**1. Start Express server**
```bash
cd server
npm run dev
```

**2. Call API dengan cURL**
```bash
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d "{\"skin_type\":\"Normal\",\"product_type\":\"Moisturizer Gel\",\"main_ingredient\":\"Ceramide\"}"
```

Expected response:
```json
{
  "message": "Rekomendasi berhasil dibuat",
  "input": {
    "skin_type": "Normal",
    "product_type": "Moisturizer Gel",
    "main_ingredient": "Ceramide"
  },
  "recommendations": [
    {
      "id": 123,
      "name": "5X Ceramide Barrier Repair Moisture Gel Moisturizer",
      "brand": "Skintific",
      "product_type": "Moisturizer Gel",
      "skin_type": "Normal",
      "main_ingredient": "Ceramide",
      "product_url": "https://...",
      "image_url": null
    },
    // ... 4 produk lainnya
  ]
}
```

## 📊 Evaluasi Model

### Metrics (Untuk Skripsi)

Karena ini **content-based filtering** tanpa user ratings, evaluasi yang cocok:

1. **Precision@K**: Dari 5 rekomendasi, berapa yang relevan?
   - Relevan = match semua kriteria (skin_type, product_type, ingredient)

2. **User Study**: Survey remaja wanita (target user)
   - "Apakah rekomendasi sesuai ekspektasi?"
   - Scale 1-5

3. **Diversity**: Berapa banyak brand berbeda dalam Top-5?

### Kelebihan KNN untuk Kasus Ini

✅ **Simple & Interpretable**: Mudah dijelaskan di skripsi
✅ **No Training Time**: Instant fit (lazy learning)
✅ **Good for Small Dataset**: Efektif untuk 2K+ data
✅ **No Cold Start Problem**: Bisa handle user baru

### Keterbatasan

⚠️ **Scalability**: Lambat untuk dataset sangat besar (>100K)
⚠️ **Feature Engineering**: Hasil tergantung pemilihan fitur
⚠️ **Equal Weighting**: Semua fitur punya bobot sama

## 🐛 Troubleshooting

### Error: "No module named 'pandas'"
**Solusi:** Pastikan virtual environment aktif
```bash
# PowerShell
.\venv\Scripts\Activate.ps1

# CMD
venv\Scripts\activate.bat

# Install ulang
pip install -r requirements.txt
```

### Error: "Model files not found"
**Solusi:** Train model dulu
```bash
python train_model.py
```

### Error: "Dataset not found"
**Solusi:** Pastikan `dataset.csv` ada di root project
```bash
# Expected path: skripsi/dataset.csv
ls ../../dataset.csv
```

### Prediction tidak akurat
**Possible causes:**
1. `products.json` belum ada → Run `npm run import-data`
2. Model belum di-retrain setelah update data → Run `python train_model.py`
3. Input typo → Cek exact match dengan `GET /api/options`

## 🔄 Update Model

Jika dataset berubah (tambah/edit produk):

```bash
# 1. Re-import data + regenerate products.json
cd server
npm run import-data

# 2. Re-train model
cd scripts
python train_model.py
```

## 📚 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| pandas | 2.1.4 | Data manipulation |
| scikit-learn | 1.3.2 | KNN algorithm |
| joblib | 1.3.2 | Model serialization |
| numpy | 1.26.2 | Numerical operations |

## 📝 Catatan untuk Skripsi

### BAB III (Metodologi)

**Flowchart sistem:**
```
User Input → Frontend Vue.js
     ↓
POST /api/recommend → Express.js
     ↓
spawn Python process → predict.py
     ↓
Load KNN Model → Encode Input
     ↓
Find 5 Nearest Neighbors
     ↓
Return Product IDs → Express.js
     ↓
Query MySQL → Get Product Details
     ↓
JSON Response → Frontend
     ↓
Display Results (Card UI)
```

**Pseudocode KNN:**
```python
Input: user_preferences (skin_type, product_type, ingredient)
Output: top_k_product_ids

1. Load trained_model, encoder, dataset
2. encoded_input = encoder.transform(user_preferences)
3. distances, indices = model.kneighbors(encoded_input, k=5)
4. product_ids = map_indices_to_database_ids(indices)
5. return product_ids
```

### BAB IV (Hasil & Pembahasan)

**Tabel perbandingan:**
- Input: 3 kombinasi berbeda (Kering+Cream, Berminyak+Gel, dll)
- Output: Analisis relevansi Top-5
- Visualisasi: Screenshot UI + Distance scores

**Analisis kelebihan/kekurangan:**
- Diskusikan precision, user satisfaction, diversity
- Bandingkan dengan metode alternatif (Rule-based, Collaborative Filtering)

---

**Author:** Abdullah Rendra Zuriansyah  
**University:** Pamulang University  
**Year:** 2025
