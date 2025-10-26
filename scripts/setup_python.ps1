# Setup Python Environment untuk ML Model
# Author: Abdullah Rendra Zuriansyah
# Usage: powershell -ExecutionPolicy Bypass -File setup_python.ps1

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   PYTHON ML ENVIRONMENT SETUP" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "🔍 Checking Python installation..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python tidak ditemukan! Install Python terlebih dahulu." -ForegroundColor Red
    Write-Host "   Download dari: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Python ditemukan: $pythonVersion" -ForegroundColor Green
Write-Host ""

# Create virtual environment
if (Test-Path "venv") {
    Write-Host "📁 Virtual environment sudah ada, skip creating..." -ForegroundColor Yellow
} else {
    Write-Host "🔧 Membuat virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Gagal membuat virtual environment!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Virtual environment berhasil dibuat" -ForegroundColor Green
}
Write-Host ""

# Activate virtual environment
Write-Host "🔌 Mengaktifkan virtual environment..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
Write-Host "✅ Virtual environment aktif" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Gagal install dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies berhasil diinstall" -ForegroundColor Green
Write-Host ""

# Train model
Write-Host "🤖 Training KNN model..." -ForegroundColor Yellow
python train_model.py
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Training gagal!" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "=============================================" -ForegroundColor Green
Write-Host "   ✅ SETUP SELESAI!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Test prediction:" -ForegroundColor White
Write-Host "      python predict.py Normal 'Moisturizer Gel' Ceramide" -ForegroundColor Gray
Write-Host "   2. Start Express server:" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor Gray
Write-Host ""
