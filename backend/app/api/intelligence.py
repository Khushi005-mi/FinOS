# 1. Imports — APIRouter, Depends, HTTPException,
#    Session, get_db, all 6 intelligence functions
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.intelligence import get_total_revenue
from app.services.intelligence import get_total_expense
from app.services.intelligence import get_profit
from app.services.intelligence import get_cash_position
from app.services.intelligence import get_revenue_by_customer
from app.services.intelligence import get_revenue_by_product
router = APIRouter()
@router.get("/intelligence/{client_id}")
def get_intelligence(
    client_id: str,
    db: Session = Depends(get_db)
):
    revenue = get_total_revenue(db, client_id)
    expenses = get_total_expense(db, client_id)
    profit = get_profit(db, client_id)
    cash = get_cash_position(db, client_id)
    products = get_revenue_by_product(db, client_id)
    customers = get_revenue_by_customer(db, client_id)
    return {
        "revenue": revenue,
        "expenses": expenses,
        "profit": profit,
        "cash": cash,
        "products": products,
        "customers": customers
    }

