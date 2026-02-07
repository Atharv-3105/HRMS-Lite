from fastapi import FastAPI
from app.core.config import settings
from app.core.database import Base_Class, engine
from app.models import employee,attendance
from app.routers.employee import router as employee_router
from app.routers.attendance import router as attendance_router

app = FastAPI(
    title = settings.PROJECT_NAME,
    version="0.0.1"
)

#Create Tables
Base_Class.metadata.create_all(bind = engine)

app.include_router(employee_router)
app.include_router(attendance_router)

@app.get("/health")
def health_check():
    return {
        "status":"ok",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENV
    }