# # 1. All imports at the top
from sqlalchemy import Column, String, Float, Integer, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime
import uuid

class BusinessProfile(Base):
    __tablename__ = "business_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True,default=uuid.uuid4)
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    sector = Column(String, nullable=False)
    location = Column(String, nullable = False)
    currency = Column(String,default="INR")

    
    business_type = Column(String ,nullable = False )
    products = Column(JSON ,nullable = False )
    revenue_streams = Column( JSON , nullable = False)


    customer_segments = Column(JSON , nullable = False)


    annual_revenue = Column(Float , nullable = False)
    monthly_revenue = Column(Float , nullable = False)
    employee_count = Column(Integer , nullable = False)

    kpis = Column(JSON , nullable = False)
    risk_areas= Column(JSON , nullable = False)
    alert_rules= Column(JSON , nullable = False)


    
    client_id = Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4)
 
  
    created_at = Column(DateTime,default = datetime.utcnow)
    updated_at = Column(DateTime,default= datetime.utcnow , onupdate=datetime.utcnow)
