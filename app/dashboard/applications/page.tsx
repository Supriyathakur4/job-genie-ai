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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/applications");

      if (!res.ok) {
        console.error("Failed to fetch applications");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!company || !role) return;

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company, role, status }),
      });

      if (!res.ok) {
        console.error("Failed to create application");
        return;
      }

      setCompany("");
      setRole("");
      setStatus("Applied");

      fetchApplications();
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Applications</h1>

      {/* Add Form */}
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Application
        </button>
      </form>

      {/* Applications List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Applications</h2>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <ul className="space-y-3">
            {applications.map((app) => (
              <li
                key={app._id}
                className="border p-3 rounded flex justify-between"
              >
                <div>
                  <p className="font-semibold">{app.company}</p>
                  <p className="text-sm text-gray-500">{app.role}</p>
                </div>
                <span className="text-sm font-medium">
                  {app.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
