@echo off
echo.
echo --- Mengaktifkan Virtual Environment dan Menjalankan Training ---

REM Mengaktifkan virtual environment
call .\env\Scripts\activate.bat

echo.
echo Menjalankan train_model.py...

REM Menjalankan skrip training
python train_model.py

echo.
echo --- Proses Training Selesai ---
echo.