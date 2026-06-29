from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api import profile
from app.api import upload
from app.api import ingest
from app.api import clean
from app.models import business_profile
from app.models import upload_log
from app.models import sales
from app.models import expense
from app.models import bank_transaction
from app.api import warehouse
from app.api import intelligence
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinOS",
    description="Financial Brain",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
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
