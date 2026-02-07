from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeResponse


router = APIRouter(
    prefix = "/employees",
    tags = ["Employees"]
)

@router.post("", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):
    
    #Check for Duplicate EMP_ID
    if db.query(Employee).filter(Employee.employee_id == payload.employee_id).first():
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail = "employee with this employee_id already exists"
        )
        
    #Check for Duplicate Email
    if db.query(Employee).filter(Employee.email == payload.email).first():
        raise HTTPException (
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "employee with this email already exists"
        )
    
    employee = Employee(
        employee_id = payload.employee_id,
        full_name = payload.full_name,
        email = payload.email,
        department = payload.department
    )
    
    
    db.add(employee)
    db.commit()
    db.refresh(employee)
    
    
    return employee

#/GET returns all the Employees order by newest first
@router.get("", response_model = list[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    
    return db.query(Employee).order_by(Employee.created_at.desc()).all()

#/DELETE is used to delete an employee from the record given a emp_id
@router.delete("/{employee_id}", status_code= status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    #Check if employee is present in DB; If not raise exception
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "employee not found"
        )
    
    db.delete(employee)
    db.commit()

    