"use client";

import { useState, useEffect } from "react";

type Application = {
  company: string;
  role: string;
  status: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const handleAdd = () => {
    if (!company || !role) return;

    setApplications([...applications, { company, role, status }]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const handleDelete = (index: number) => {
    const updated = applications.filter((_, i) => i !== index);
    setApplications(updated);
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const updated = [...applications];
    updated[index].status = newStatus;
    setApplications(updated);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Applications</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-black text-white rounded p-2"
          >
            Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Company</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{app.company}</td>
                  <td className="py-2">{app.role}</td>

                  <td className="py-2">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </td>

                  <td className="py-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
