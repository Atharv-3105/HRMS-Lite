from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

connect_args = {}

#Check to ensure same-db connection is used across diff threads
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread":False}
 
#This creates the DB Engine which acts as the CORE INTERFACE between the Code and DB   
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    future=True,
)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine,
)

#Parent class for all ORM models
Base_Class = declarative_base()

#function which provides DB sessions 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()