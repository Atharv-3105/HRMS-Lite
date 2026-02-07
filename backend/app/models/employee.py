from sqlalchemy import Column,Integer,String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base_Class



class Employee(Base_Class):
    __tablename__ = "employees"
    
    #'id' is the identity in the DB; whereas 'emp_id' is the identity in the business(org).
    id = Column(Integer, primary_key=True, index = True)
    employee_id = Column(String, unique=True, nullable=False, index = True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    department = Column(String, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 