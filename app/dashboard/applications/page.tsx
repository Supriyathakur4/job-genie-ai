"use client";

import { useEffect, useState } from "react";

interface Application {
  _id: string;
  company: string;
  role: string;
  status: string;
  appliedDate: string;
}

export default function ApplicationsPage() {

  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    const token = localStorage.getItem("token");

    const res = await fetch("/api/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setApplications(data);
    } else {
      console.error("API Error:", data);
      setApplications([]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!company || !role) return;

    const token = localStorage.getItem("token");

    await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ company, role, status }),
    });

    setCompany("");
    setRole("");
    setStatus("Applied");

    fetchApplications();
  };

  const deleteApplication = async (id: string) => {

    const token = localStorage.getItem("token");

    await fetch("/api/applications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    fetchApplications();
  };

  const updateStatus = async (id: string, newStatus: string) => {

    const token = localStorage.getItem("token");

    await fetch("/api/applications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    fetchApplications();
  };

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Applications</h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        <input
          className="w-full border p-2 rounded"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Application
        </button>

      </form>

      {/* APPLICATION LIST */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Your Applications
        </h2>

        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (

          <ul className="space-y-3">

            {applications.map((app) => (

              <li
                key={app._id}
                className="border p-4 rounded flex justify-between items-center"
              >

                <div>
                  <p className="font-semibold">{app.company}</p>
                  <p className="text-sm text-gray-500">{app.role}</p>
                </div>

                <div className="flex gap-3">

                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(app._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>

                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </div>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}