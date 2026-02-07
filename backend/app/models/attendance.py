from sqlalchemy import Column,Integer,Date,String,ForeignKey,UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base_Class


class Attendance(Base_Class):
    __tablename__ = "attendance"
    
    id = Column(Integer, primary_key=True, index = True)
    #Link to 'id'(PRIMARY_KEY) column in the 'employees' table
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"),
                    nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False)
    
    employee = relationship("Employee", backref="attendance_records")
    
    #Define constraint for One attendance per employee per day
    __table_args__ = (
        UniqueConstraint(
            "employee_id",
            "date",
            name = "unique_employee_attendance_per_day"
        ),
    )