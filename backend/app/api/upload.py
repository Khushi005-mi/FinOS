# 1. All imports
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
from app.core.database import get_db
from app.models.upload_log import UploadLog
# 2. router = APIRouter()
router = APIRouter()

@router.post("/upload/sales")
async def upload_sales(
    client_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
   if not file.filename.endswith(".csv"):
      raise HTTPException(status_code=400, detail="only csv file is excepted here")
   contents = await file.read()
   os.makedirs("uploads", exist_ok=True)
   file_path = f"uploads/{file.filename}"
   
   with open(file_path, "wb") as f:
       f.write(contents)

   log_entry = UploadLog(
       client_id=client_id,
       file_type="sales",
       file_name=file.filename,
       status="pending"
   )
   db.add(log_entry)
   db.commit()
   db.refresh(log_entry)
   return log_entry

@router.post("/upload/expenses")
async def upload_expenses(
    client_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
   if not file.filename.endswith(".csv"):
      raise HTTPException(status_code=400, detail="only csv file is excepted here")
   contents = await file.read()
   os.makedirs("uploads", exist_ok=True)
   file_path = f"uploads/{file.filename}"
   with open(file_path, "wb") as f:
       f.write(contents)

   log_entry = UploadLog(
       client_id=client_id,
       file_type="expenses",
       file_name=file.filename,
       status="pending"
   )
   db.add(log_entry)
   db.commit()
   db.refresh(log_entry)
   return log_entry

@router.post("/upload/bank")
async def upload_bank(
   client_id : str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
   if not file.filename.endswith(".csv"):
      raise HTTPException(status_code=400, detail="only csv file is excepted here") 
   os.makedirs("uploads", exist_ok=True)
   file_path = f"uploads/{file.filename}"
   contents = await file.read()
   with open(file_path, "wb") as f:
       f.write(contents)
   log_entry = UploadLog(
       client_id=client_id,
       file_type="bank_transactions",
       file_name=file.filename,
       status="pending"
   )
   db.add(log_entry)
   db.commit()
   db.refresh(log_entry)
   return log_entry
