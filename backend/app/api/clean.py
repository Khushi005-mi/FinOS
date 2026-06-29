from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
import os
from app.core.database import get_db
from app.models.upload_log import UploadLog
from app.services.cleaning import (
    clean_dates,
    remove_duplicates,
    handle_missing_critical,
    handle_missing_optional,
    validate_amount
)
router = APIRouter()

CLEANING_RULES = {
    "sales": {
        "date_column": "date",
        "duplicate_key": "invoice_id",
        "critical_column": "revenue",
        "optional_column": "customer",
        "amount_column": "revenue"
    },
    "expenses": {
        "date_column": "date",
        "duplicate_key": "expense_id",
        "critical_column": "amount",
        "optional_column": "vendor",
        "amount_column": "amount"
    },
    "bank_transactions": {
        "date_column": "date",
        "duplicate_key": "transaction_id",
        "critical_column": "amount",
        "optional_column": "description",
        "amount_column": None
    }
}

@router.post("/clean/{upload_id}")
def clean_file(
    upload_id: str,
    db: Session = Depends(get_db)
):
    log_entry = (
        db.query(UploadLog)
        .filter(UploadLog.id == upload_id)
        .first()
    )
    if log_entry is None:
        raise HTTPException(status_code=404, detail="Upload not found")

    file_path = f"uploads/{log_entry.file_name}"
    df = pd.read_csv(file_path)
    original_count = len(df)

    rules = CLEANING_RULES.get(log_entry.file_type)
    if rules is None:
        raise HTTPException(status_code=400, detail="Invalid file type")

    df = clean_dates(df, rules["date_column"])
    df = remove_duplicates(df, rules["duplicate_key"])
    df = handle_missing_critical(df, rules["critical_column"])
    df = handle_missing_optional(df, rules["optional_column"], "Unknown")
    if rules["amount_column"] is not None:
     df = validate_amount(df, rules["amount_column"])
    clean_count = len(df)
    rejected_count = original_count - clean_count

    os.makedirs("cleaned", exist_ok=True)
    clean_path = f"cleaned/{log_entry.file_name}"
    df.to_csv(clean_path, index=False)

    log_entry.rows_received = original_count
    log_entry.rows_clean = clean_count
    log_entry.rows_rejected = rejected_count
    log_entry.status = "clean"

    db.commit()
    db.refresh(log_entry)
    return log_entry
