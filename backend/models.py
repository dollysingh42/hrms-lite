from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    department = Column(String(50), nullable=False)

    attendance = relationship(
        "Attendance",
        back_populates="employee",
        cascade="all, delete"
    )


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"))
    date = Column(Date, nullable=False)
    status = Column(String(10), nullable=False)

    employee = relationship("Employee", back_populates="attendance")

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_employee_date"),
    )
