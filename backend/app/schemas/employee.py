from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class EmployeeBase(BaseModel):
    employee_id: str = Field(..., example="EMP001")
    full_name: str = Field(..., example="Jon Snow")
    email: EmailStr
    department: str = Field(..., example = "Engineering")
    

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True
        