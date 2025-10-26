@echo off
REM Setup Python Environment untuk ML Model
REM Author: Abdullah Rendra Zuriansyah
REM Usage: setup_python.bat

echo.
echo =============================================
echo    PYTHON ML ENVIRONMENT SETUP
echo =============================================
echo.

REM Check if Python is installed
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python tidak ditemukan!
    echo Download dari: https://www.python.org/downloads/
    exit /b 1
)
echo Python ditemukan!
echo.

REM Create virtual environment
if exist "venv" (
    echo Virtual environment sudah ada, skip creating...
) else (
    echo Membuat virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Gagal membuat virtual environment!
        exit /b 1
    )
    echo Virtual environment berhasil dibuat!
)
echo.

REM Activate virtual environment
echo Mengaktifkan virtual environment...
call venv\Scripts\activate.bat
echo.

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Gagal install dependencies!
    exit /b 1
)
echo Dependencies berhasil diinstall!
echo.

REM Train model
echo Training KNN model...
python train_model.py
if errorlevel 1 (
    echo ERROR: Training gagal!
    exit /b 1
)
echo.

echo =============================================
echo    SETUP SELESAI!
echo =============================================
echo.
echo Next Steps:
echo    1. Test prediction:
echo       python predict.py Normal "Moisturizer Gel" Ceramide
echo    2. Start Express server:
echo       npm run dev
echo.
pause
