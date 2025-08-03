@echo off
echo 🚀 Setting up Next.js + FastAPI Starter Project
echo ================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Start PostgreSQL database
echo 🐘 Starting PostgreSQL database...
docker-compose up -d postgres

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Setup backend
echo 🐍 Setting up Python backend...
cd backend

REM Create virtual environment
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Copy environment file
copy env.example .env

echo ✅ Backend setup complete

REM Setup frontend
echo ⚛️  Setting up Next.js frontend...
cd ..\frontend

REM Install dependencies
npm install

REM Copy environment file
copy env.example .env.local

echo ✅ Frontend setup complete

echo.
echo 🎉 Setup complete!
echo.
echo To start the application:
echo.
echo 1. Start the backend:
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 2. Start the frontend (in a new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📚 API Documentation: http://localhost:8000/docs
echo.

pause 