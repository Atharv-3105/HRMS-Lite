from pydantic import BaseModel, Field
from datetime import date
from typing import Literal


class AttendanceBase(BaseModel):
    employee_id:int = Field(..., example = 1)
    date: date
    status: Literal["Present", "Absent"]
    

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int
    
    class Config:
        from_attributes = True
        
