from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routers import auth, items

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API",
    description="Backend API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(items.router)


@app.get("/")
def read_root():
    return {"message": "API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"} 