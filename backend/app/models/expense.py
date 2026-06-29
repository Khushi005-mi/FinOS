from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime
import uuid

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), nullable=False)
    upload_id = Column(UUID(as_uuid=True), nullable=False)
    expense_id = Column(String, nullable=True)
    date = Column(DateTime, nullable=True)
    vendor = Column(String)
    category = Column(String)
    amount = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    