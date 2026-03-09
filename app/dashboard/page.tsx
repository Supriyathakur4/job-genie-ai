"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  CalendarCheck,
  Award,
  TrendingUp,
} from "lucide-react";

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
    <div className="space-y-12">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-10 rounded-3xl text-white shadow-2xl">
        <h1 className="text-4xl font-bold mb-3">
          AI Career Dashboard
        </h1>
        <p className="text-lg opacity-90">
          Track applications, analyze performance, and optimize your job search with intelligent insights.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Total */}
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Applications</p>
              <h2 className="text-4xl font-bold mt-2">{total}</h2>
            </div>
            <Briefcase size={42} className="text-indigo-600" />
          </div>
        </div>

        {/* Interviews */}
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Interviews</p>
              <h2 className="text-4xl font-bold mt-2">{interviews}</h2>
              <p className="text-sm text-indigo-500 mt-2">
                {interviewRate}% success rate
              </p>
            </div>
            <CalendarCheck size={42} className="text-indigo-600" />
          </div>
        </div>

        {/* Offers */}
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Offers</p>
              <h2 className="text-4xl font-bold mt-2">{offers}</h2>
              <p className="text-sm text-green-500 mt-2">
                {offerRate}% conversion
              </p>
            </div>
            <Award size={42} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-indigo-600" />
          <h2 className="text-2xl font-semibold">
            Performance Insights
          </h2>
        </div>

        <div className="space-y-8">
          {/* AI Insight Panel */}
<div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl">
  <h2 className="text-2xl font-semibold mb-4">
    🤖 AI Career Insight
  </h2>

  {total === 0 && (
    <p>
      You haven’t started applying yet. Begin your journey today 
    </p>
  )}

  {total > 0 && interviews === 0 && (
    <p>
      Try improving your resume keywords to increase interview chances.
    </p>
  )}

  {interviews > 0 && offers === 0 && (
    <p>
      Great progress! Focus on interview preparation to convert offers.
    </p>
  )}

  {offers > 0 && (
    <p>
      Excellent work! You are converting applications successfully 
    </p>
  )}
</div>

          {/* Interview Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span>Interview Rate</span>
              <span>{interviewRate}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-indigo-600 h-4 rounded-full transition-all duration-700"
                style={{ width: `${interviewRate}%` }}
              />
            </div>
          </div>

          {/* Offer Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span>Offer Conversion</span>
              <span>{offerRate}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-700"
                style={{ width: `${offerRate}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

