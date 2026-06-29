from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.upload_log import UploadLog
import pandas as pd
from app.models.sales import Sales
from app.models.expense import Expense
from app.models.bank_transaction import BankTransaction
router = APIRouter()
@router.post("/warehouse/{upload_id}")
def warehouse(
    upload_id: str,                   
    db: Session = Depends(get_db)
):# Read cleaned file
   log_entry = db.query(UploadLog).filter(UploadLog.id == upload_id).first()
   if log_entry is None:
    raise HTTPException(status_code=404, detail="Upload not found")
   file_path = f"cleaned/{log_entry.file_name}"
   df = pd.read_csv(file_path)

   # Insert rows based on file type
   if log_entry.file_type == "sales":
       for _, row in df.iterrows():
           record = Sales(
               client_id=log_entry.client_id,
               upload_id=log_entry.id,
               invoice_id=row.get("invoice_id"),
               date=row.get("date"),
               customer=row.get("customer"),
               product=row.get("product"),
               quantity=row.get("quantity"),
               unit_price=row.get("unit_price"),
               revenue=row.get("revenue")
           )
           db.add(record)

   elif log_entry.file_type == "expenses":
       for _, row in df.iterrows():
           record = Expense(
               client_id=log_entry.client_id,
               upload_id=log_entry.id,
               expense_id=row.get("expense_id"),
               date=row.get("date"),
               category=row.get("category"),
               vendor=row.get("vendor"),
               amount=row.get("amount")
           )
           db.add(record)

   elif log_entry.file_type == "bank_transactions":
       for _, row in df.iterrows():
           record = BankTransaction(
               client_id=log_entry.client_id,
               upload_id=log_entry.id,
               transaction_id=row.get("transaction_id"),
               date=row.get("date"),
               description=row.get("description"),
               amount=row.get("amount"),
               type=row.get("type"),
               balance=row.get("balance")
           )
           db.add(record)

   log_entry.status = "warehoused"
   db.commit()
   db.refresh(log_entry)
   return log_entry 