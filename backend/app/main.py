from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base_Class, engine
from app.models import employee,attendance
from app.routers.employee import router as employee_router
from app.routers.attendance import router as attendance_router

app = FastAPI(
    title = settings.PROJECT_NAME,
    version="0.0.1"
)

#CORS MiddleWare setup
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers = ["*"],
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