"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] text-white p-8 flex flex-col border-r border-gray-800">
        <h2 className="text-xl font-semibold tracking-wide mb-12">
          Job Genie
        </h2>

        <nav className="flex flex-col gap-1 text-sm font-medium">
          
          <Link
            href="/dashboard"
            className={`px-4 py-3 rounded-md transition ${
              pathname === "/dashboard"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/applications"
            className={`px-4 py-3 rounded-md transition ${
              pathname === "/dashboard/applications"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Applications
          </Link>

          <Link
            href="/dashboard/resume"
            className={`px-4 py-3 rounded-md transition ${
              pathname === "/dashboard/resume"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Resume Analyzer
          </Link>

          <Link
            href="/dashboard/cover-letter"
            className={`px-4 py-3 rounded-md transition ${
              pathname === "/dashboard/cover-letter"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Cover Letter Generator
          </Link>
        </nav>

        <div className="mt-auto pt-12 text-xs text-gray-500">
          Academic Project • 2026
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center">
  
  <h1 className="text-2xl font-semibold text-gray-800">
    AI Career Assistant Dashboard
  </h1>

  <div className="flex items-center gap-4">
    
    <div className="text-sm text-gray-600">
      Supriya Thakur
    </div>

    <button
      onClick={() => {
        window.location.href = "/login";
      }}
      className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
    >
      Logout
    </button>

  </div>

</header>


        {/* Page Content */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

