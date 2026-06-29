from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime
import uuid

class BankTransaction(Base):
    __tablename__ = "bank_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), nullable=False)
    upload_id = Column(UUID(as_uuid=True), nullable=False)
    transaction_id = Column(String,nullable=True)
    balance = Column(Float,nullable=True)
    date = Column(DateTime, nullable=True)
    description = Column(String)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    