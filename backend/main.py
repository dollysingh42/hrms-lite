from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict after frontend deploy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- EMPLOYEES ----------------

@app.post("/employees", response_model=schemas.EmployeeResponse, status_code=201)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    new_employee = models.Employee(**employee.dict())
    db.add(new_employee)

    try:
        db.commit()
        db.refresh(new_employee)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Employee ID or Email already exists"
        )

    return new_employee


@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@app.delete("/employees/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return None

# ---------------- ATTENDANCE ----------------

@app.post("/attendance", status_code=201)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(
        models.Employee.id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = models.Attendance(**attendance.dict())
    db.add(record)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Attendance already marked for this date"
        )

    return {"message": "Attendance marked successfully"}


@app.get("/attendance/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
