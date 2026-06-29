# 1. Imports: APIRouter, Depends, HTTPException,
#    Session, pandas, get_db, UploadLog
import pandas as pd
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.upload_log import UploadLog
# 2. router = APIRouter()
router = APIRouter()
@router.post("/ingest/{upload_id}")
def ingest_file(
    upload_id: str,                   
    db: Session = Depends(get_db)
):
   log_entry = db.query(UploadLog).filter(UploadLog.id == upload_id).first()
   if log_entry is None:
    raise HTTPException(status_code=404, detail="Upload not found")
   file_path = f"uploads/{log_entry.file_name}"
   df = pd.read_csv(file_path)   
   log_entry.rows_received = len(df)
   log_entry.status = "ingested"
   db.commit()
   db.refresh(log_entry)
   return log_entry
   
