from sqlalchemy import Column, String, Integer, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime
import uuid

class UploadLog(Base):
    __tablename__ = "upload_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), nullable=False)
    file_type = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    status = Column(String, default="pending")
    rows_received = Column(Integer, default=0)
    rows_clean = Column(Integer, default=0)
    rows_rejected = Column(Integer, default=0)
    error_summary = Column(JSON, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
