from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api import profile, upload, ingest, clean, warehouse, intelligence

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinOS",
    description="Financial Brain",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router)
app.include_router(upload.router)
app.include_router(ingest.router)
app.include_router(clean.router)
app.include_router(warehouse.router)
app.include_router(intelligence.router)

@app.get("/")
def root():
    return {
        "service": "FinOS",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
