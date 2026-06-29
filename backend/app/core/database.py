# 1. Load the .env file
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
load_dotenv()
# 2. Read the DATABASE_URL variable from it
DATABASE_URL = os.getenv("DATABASE_URL")
# 3. Create a SQLAlchemy "engine" using that URL
from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL)
# 4. Create a "SessionLocal" and a "Base"
# from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 
#    (these will be used by other files later)
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()