'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Loader from '../../components/Loader';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await api.get('/employees');
      setEmployees(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      alert('All fields are required');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/employees', form);
      setOpen(false);
      setForm({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      });
      fetchEmployees();
    } catch (err) {
      alert(err?.message || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;

    try {
      setDeletingId(id);
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert('Failed to delete employee');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loader label="Loading employees..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Employees</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          + Add Employee
        </button>
      </div>

      {/* Table */}
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees found</p>
      ) : (
        <div className="overflow-x-auto bg-card rounded-xl shadow-sm border border-border">
          <table className="w-full">
            <thead className="bg-muted text-muted-foreground text-sm">
              <tr>
                <th className="p-3 text-left font-medium">Employee ID</th>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Department</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              {employees.map((e) => (
                <tr
                  key={e.id}
                  className="border-t border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3">{e.employee_id}</td>
                  <td className="p-3 font-medium">{e.full_name}</td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">{e.department}</td>
                  <td className="p-3">
                    <button
                      disabled={deletingId === e.id}
                      onClick={() => handleDelete(e.id)}
                      className="text-red-600 hover:underline text-sm flex items-center gap-2 disabled:opacity-60"
                    >
                      {deletingId === e.id ? (
                        <>
                          <span className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          Deleting…
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Employee Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card text-card-foreground w-full max-w-md rounded-xl shadow-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="employee_id"
                placeholder="Employee ID"
                value={form.employee_id}
                onChange={handleChange}
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />

              <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />

              <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {submitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
