from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.core.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate,AttendanceResponse

from typing import Optional
from datetime import date


router = APIRouter(
    prefix="/attendance",
    tags = ["Attendance"]
)


@router.post("", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(payload: AttendanceCreate, db: Session = Depends(get_db)):
    
    #Check if employee exists in DB 
    employee = db.query(Employee).filter(Employee.id == payload.employee_id).first()
    if not employee:
        raise HTTPException(
            status_code= status.HTTP_404_NOT_FOUND,
            detail = "employee not found"
        )
        
    attendance = Attendance(
        employee_id = payload.employee_id,
        date = payload.date,
        status = payload.status
    )
    
    db.add(attendance)
    
    try:
        db.commit()
        db.refresh(attendance)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail = "attendance already marked for this employee on this date"
        )
        
    return attendance


@router.get("/{employee_id}", response_model=list[AttendanceResponse])
def get_attendance_for_employee(employee_id: int, 
                                date:Optional[date] = None,
                                db: Session = Depends(get_db)):
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "employee not found"
        )
        
    query = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    )
    
    if date:
        query = query.filter(Attendance.date == date)
    
    return query.order_by(Attendance.date.desc()).all()
    