import os
from dotenv import load_dotenv

load_dotenv()

#========This class will contain all the Important Env Vars
class Settings:
    PROJECT_NAME = "HRMS LITE"
    ENV = os.getenv("ENV", "development")
    
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    

settings = Settings()