'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Loader from '../../components/Loader';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [attendance, setAttendance] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await api.get('/employees');
        setEmployees(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load employees');
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const fetchAttendance = async (id) => {
    if (!id) return;
    setLoadingAttendance(true);
    try {
      const data = await api.get(`/attendance/${id}`);
      setAttendance(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load attendance');
    } finally {
      setLoadingAttendance(false);
    }
  };

  const submitAttendance = async () => {
    if (!employeeId || !date) {
      alert('Please select employee and date');
      return;
    }

    // ✅ Extra validation (safety)
    if (date < today) {
      alert('You cannot select a past date');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/attendance', {
        employee_id: Number(employeeId),
        date,
        status,
      });
      await fetchAttendance(employeeId);
      alert('Attendance marked successfully');
    } catch (err) {
      alert(err?.message || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEmployees) {
    return <Loader label="Loading employees..." />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Attendance</h1>

      {/* Mark Attendance */}
      <div className="p-6 rounded-xl shadow-sm border border-border bg-card text-card-foreground max-w-md space-y-4">
        <h2 className="font-semibold text-lg">Mark Attendance</h2>

        <select
          className="w-full p-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          value={employeeId}
          onChange={(e) => {
            setEmployeeId(e.target.value);
            fetchAttendance(e.target.value);
          }}
        >
          <option value="">Select employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          min={today}   // ✅ Past dates disabled
          className="w-full p-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring [color-scheme:light] dark:[color-scheme:dark]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="w-full p-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button
          onClick={submitAttendance}
          disabled={submitting}
          className="w-full py-2 rounded-lg transition bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Mark Attendance'}
        </button>
      </div>

      {/* Attendance Records */}
      <div className="p-6 rounded-xl shadow-sm border border-border bg-card text-card-foreground">
        <h2 className="font-semibold text-lg mb-4">Attendance Records</h2>

        {!employeeId ? (
          <p className="text-muted-foreground text-sm">
            Select an employee to view attendance
          </p>
        ) : loadingAttendance ? (
          <Loader label="Loading attendance..." />
        ) : attendance.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No attendance records found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border
                          ${
                            a.status === 'Present'
                              ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                              : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                          }
                        `}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
