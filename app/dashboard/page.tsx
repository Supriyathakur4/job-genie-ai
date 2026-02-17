"use client";

import { useEffect, useState } from "react";
import { Briefcase, CalendarCheck, Award } from "lucide-react";

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [offers, setOffers] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("applications");

    if (saved) {
      const apps = JSON.parse(saved);

      setTotal(apps.length);
      setInterviews(apps.filter((a: any) => a.status === "Interview").length);
      setOffers(apps.filter((a: any) => a.status === "Offer").length);
    }
  }, []);

  const interviewRate = total ? ((interviews / total) * 100).toFixed(0) : 0;
  const offerRate = total ? ((offers / total) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Track your job applications, interviews, and offers in one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Applications */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">Total Applications</p>
              <h2 className="text-3xl font-bold mt-2">{total}</h2>
            </div>
            <Briefcase size={40} />
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">Interviews Scheduled</p>
              <h2 className="text-3xl font-bold mt-2">{interviews}</h2>
              <p className="text-sm mt-1">{interviewRate}% success rate</p>
            </div>
            <CalendarCheck size={40} />
          </div>
        </div>

        {/* Offers */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">Offers Received</p>
              <h2 className="text-3xl font-bold mt-2">{offers}</h2>
              <p className="text-sm mt-1">{offerRate}% conversion rate</p>
            </div>
            <Award size={40} />
          </div>
        </div>

      </div>

      {/* Analytics Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Application Analytics
        </h2>

        <div className="space-y-6">

          {/* Interviews Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span>Interview Rate</span>
              <span>{interviewRate}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${interviewRate}%` }}
              />
            </div>
          </div>

          {/* Offer Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span>Offer Conversion</span>
              <span>{offerRate}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${offerRate}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
