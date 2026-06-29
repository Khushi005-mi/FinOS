from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime
import uuid

class Sales(Base):
  __tablename__ = "sales"
  
  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

  client_id = Column(UUID(as_uuid=True), nullable=False)
  upload_id = Column(UUID(as_uuid=True), nullable=False)

  invoice_id = Column(String, nullable=True)

  date = Column(DateTime, nullable=True)

  customer = Column(String, nullable=True)
  product = Column(String, nullable=True)

  quantity = Column(Float, nullable=True)
  unit_price = Column(Float, nullable=True)

  revenue = Column(Float, nullable=False)

  created_at = Column(DateTime, default=datetime.utcnow)

