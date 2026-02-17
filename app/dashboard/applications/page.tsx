"use client";

import { useState } from "react";

type Application = {
  company: string;
  role: string;
  status: string;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const addApplication = () => {
    if (!company || !role) return;

    const newApp = { company, role, status };
    setApplications([...applications, newApp]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">
        Add New Application
      </h2>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 space-y-4">
        
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />

        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={addApplication}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Add Application
        </button>
      </div>

      <h3 className="text-md font-medium mb-4">
        Your Applications
      </h3>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications added yet.</p>
        ) : (
          applications.map((app, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border border-gray-200"
            >
              <p className="font-semibold">{app.company}</p>
              <p className="text-sm text-gray-600">{app.role}</p>
              <p className="text-sm mt-1">
                Status: <span className="font-medium">{app.status}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

