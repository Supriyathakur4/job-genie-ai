"use client";

import { useEffect, useState } from "react";
import { Briefcase, CalendarCheck, Award, XCircle } from "lucide-react";
import ApplicationChart from "@/components/ApplicationChart";
import Link from "next/link";

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [offers, setOffers] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("applications");

    if (saved) {
      const apps = JSON.parse(saved);

      setTotal(apps.length);
      setInterviews(apps.filter((a: any) => a.status === "Interview").length);
      setOffers(apps.filter((a: any) => a.status === "Offer").length);
      setRejected(apps.filter((a: any) => a.status === "Rejected").length);
    }
  }, []);

  const interviewRate = total ? Math.round((interviews / total) * 100) : 0;
  const offerRate = total ? Math.round((offers / total) * 100) : 0;
  const rejectionRate = total ? Math.round((rejected / total) * 100) : 0;

  const chartData = [
    { status: "Applied", count: total },
    { status: "Interview", count: interviews },
    { status: "Offer", count: offers },
    { status: "Rejected", count: rejected },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold tracking-tight">
          ✨ AI Career Dashboard
        </h1>
        <p className="mt-2 text-white/90">
          Track applications, analyze performance, and optimize your job search with intelligent insights.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Total Applications */}
        <Link href="/dashboard/applications">
          <div className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition flex justify-between items-center">
            <div>
              <p className="opacity-80">Total Applications</p>
              <h2 className="text-3xl font-bold mt-2">{total}</h2>
            </div>
            <Briefcase size={36} />
          </div>
        </Link>

        {/* Interviews */}
        <Link href="/dashboard/applications">
          <div className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition flex justify-between items-center">
            <div>
              <p className="opacity-80">Interviews</p>
              <h2 className="text-3xl font-bold mt-2">{interviews}</h2>
              <p className="text-sm mt-1">{interviewRate}% success rate</p>
            </div>
            <CalendarCheck size={36} />
          </div>
        </Link>

        {/* Offers */}
        <Link href="/dashboard/applications">
          <div className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition flex justify-between items-center">
            <div>
              <p className="opacity-80">Offers</p>
              <h2 className="text-3xl font-bold mt-2">{offers}</h2>
              <p className="text-sm mt-1">{offerRate}% conversion</p>
            </div>
            <Award size={36} />
          </div>
        </Link>

        {/* Rejections */}
        <Link href="/dashboard/applications">
          <div className="cursor-pointer bg-gradient-to-r from-red-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition flex justify-between items-center">
            <div>
              <p className="opacity-80">Rejections</p>
              <h2 className="text-3xl font-bold mt-2">{rejected}</h2>
              <p className="text-sm mt-1">{rejectionRate}% rejection</p>
            </div>
            <XCircle size={36} />
          </div>
        </Link>

      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">
          📊 Application Status Analytics
        </h2>

        <ApplicationChart data={chartData} />
      </div>

      {/* Analytics Section */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6">
          📈 Performance Insights
        </h2>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl mb-6 shadow-md">
          <h3 className="text-lg font-semibold">🤖 AI Career Insight</h3>

          <p className="mt-1 text-white/90">
            {total === 0
              ? "You haven't started applying yet. Begin your journey today."
              : rejectionRate > 70
              ? "Your rejection rate is high. Try improving your resume and targeting better-matched roles."
              : interviews === 0
              ? "Try tailoring your resume for each role to increase interview chances."
              : offers === 0
              ? "Great! You're getting interviews. Focus on interview preparation."
              : "Excellent! Your strategy is working. Keep applying smartly."}
          </p>
        </div>

        {/* Interview Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Interview Rate</span>
            <span>{interviewRate}%</span>
          </div>

          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${interviewRate}%` }}
            />
          </div>
        </div>

        {/* Offer Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Offer Conversion</span>
            <span>{offerRate}%</span>
          </div>

          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${offerRate}%` }}
            />
          </div>
        </div>

        {/* Rejection Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span>Rejection Rate</span>
            <span>{rejectionRate}%</span>
          </div>

          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${rejectionRate}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}