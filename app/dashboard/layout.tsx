import Link from "next/link";
import { Briefcase, FileText, LayoutDashboard, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold tracking-wide mb-10">
            Job Genie
          </h2>

          <nav className="flex flex-col gap-6 text-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/applications"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Briefcase size={18} />
              Applications
            </Link>

            <Link
              href="/dashboard/resume"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <FileText size={18} />
              Resume Analyzer
            </Link>
          </nav>
        </div>

        <button className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 transition">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

