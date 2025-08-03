# Full-Stack Application

A web application with user authentication and item management.

### Backend Setup
```bash
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
copy env.example .env.local
npm run dev
```

### Database
```bash
docker-compose up -d postgres
```

## Usage
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs 
