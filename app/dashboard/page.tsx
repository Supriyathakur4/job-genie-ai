"use client";

import { useEffect, useState } from "react";
import { Briefcase, CalendarCheck, Award, XCircle } from "lucide-react";
import ApplicationChart from "@/components/ApplicationChart";
import Link from "next/link";

export default function DashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [offers, setOffers] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();

      if (Array.isArray(data)) {
        setApplications(data);

        setTotal(data.length);
        setInterviews(data.filter((a: any) => a.status === "Interview").length);
        setOffers(data.filter((a: any) => a.status === "Offer").length);
        setRejected(data.filter((a: any) => a.status === "Rejected").length);
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    }
  };

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

        <Link href="/dashboard/applications">
          <div className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition flex justify-between items-center">
            <div>
              <p className="opacity-80">Total Applications</p>
              <h2 className="text-3xl font-bold mt-2">{total}</h2>
            </div>
            <Briefcase size={36} />
          </div>
        </Link>

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

      {/* AI Insight */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6">
          📈 Performance Insights
        </h2>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">🤖 AI Career Insight</h3>

          <p className="mt-2 text-white/90">
            {total === 0
              ? "You haven't started applying yet. Begin your journey today."
              : rejectionRate > 70
              ? "Your rejection rate is high. Improve your resume and target better matching roles."
              : interviews === 0
              ? "Try tailoring your resume for each role to increase interview chances."
              : offers === 0
              ? "Great! You're getting interviews. Focus on interview preparation."
              : "Excellent! Your strategy is working. Keep applying smartly."}
          </p>
        </div>

      </div>

    </div>
  );
}