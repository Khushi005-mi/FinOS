from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.api import profile, upload, ingest, clean, warehouse, intelligence

# Create tables (if they don't exist)
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI app
app = FastAPI(
    title="FinOS",
    description="Financial Brain",
    version="1.0.0",
)

# CORS middleware – allow your frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",  # Add this line
        "https://fin-os-five.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ← temporarily allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all route routers
app.include_router(profile.router)
app.include_router(upload.router)
app.include_router(ingest.router)
app.include_router(clean.router)
app.include_router(warehouse.router)
app.include_router(intelligence.router)

# Root endpoint
@app.get("/")
def root():
    return {
        "service": "FinOS",
        "version": "1.0.0",
        "status": "running"
    }

# Health check
@app.get("/health")
def health():
    return {"status": "healthy"}