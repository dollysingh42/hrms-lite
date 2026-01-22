'use client';

import { useEffect, useState } from 'react';

const MOCK_EMPLOYEES = [1, 2, 3, 4, 5]; 

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmployees(MOCK_EMPLOYEES);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="p-6 text-muted-foreground">Loading dashboard...</div>;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 p-6">
      <div className="col-span-12 xl:col-span-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Metric title="Total Employees" value={employees.length} />
          <Metric title="Present Today" value="—" />
          <Metric title="Absent Today" value="—" />
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="p-6 rounded-xl shadow-sm border border-border bg-card text-card-foreground">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold text-primary mt-2">{value}</p>
    </div>
  );
}