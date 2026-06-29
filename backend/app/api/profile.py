from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.business_profile import BusinessProfile


class BusinessProfileCreate(BaseModel):
    company_name: str
    industry: str

    sector: Optional[str] = None
    location: Optional[str] = None
    currency: Optional[str] = "INR"
    business_type: str

    products: Optional[List] = None
    revenue_streams: Optional[List] = None
    customer_segments: Optional[List] = None

    annual_revenue: Optional[float] = None
    monthly_revenue: Optional[float] = None
    employee_count: Optional[int] = None

    kpis: Optional[List] = None
    risk_areas: Optional[List] = None
    alert_rules: Optional[List] = None


router = APIRouter()


@router.post("/profile")
def create_profile(
    data: BusinessProfileCreate,
    db: Session = Depends(get_db)
):
    profile = BusinessProfile(
        company_name=data.company_name,
        industry=data.industry,
        sector=data.sector,
        annual_revenue=data.annual_revenue,
        location=data.location,
        currency=data.currency,
        business_type=data.business_type,
        products=data.products,
        revenue_streams=data.revenue_streams,
        customer_segments=data.customer_segments,
        monthly_revenue=data.monthly_revenue,
        employee_count=data.employee_count,
        kpis=data.kpis,
        risk_areas=data.risk_areas,
        alert_rules=data.alert_rules
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


@router.get("/profile/{client_id}")
def get_profile(
    client_id: str,
    db: Session = Depends(get_db)
):
    profile = (
        db.query(BusinessProfile)
        .filter(BusinessProfile.client_id == client_id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Client not found"
        )

    return profile