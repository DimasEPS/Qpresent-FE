import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock4,
  LogOut,
  Plus,
  QrCode,
  XCircle,
} from "lucide-react";

const classCards = [
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
  {
    code: "CS305",
    title: "Web Development",
    instructor: "Prof. Michael Chen",
    term: "Fall 2024",
  },
  {
    code: "CS401",
    title: "Database Systems",
    instructor: "Dr. Amanda Lee",
    term: "Fall 2024",
  },
];

const attendanceHistory = [
  { className: "Data Structures", date: "2024-11-14", time: "09:00", status: "Present" },
  { className: "Web Development", date: "2024-11-13", time: "14:00", status: "Present" },
  { className: "Database Systems", date: "2024-11-13", time: "10:00", status: "Absent" },
  { className: "Data Structures", date: "2024-11-12", time: "09:00", status: "Present" },
  { className: "Web Development", date: "2024-11-11", time: "14:00", status: "Late" },
];

const statusMap = {
  Present: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  },
  Absent: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-100",
    icon: <XCircle className="h-4 w-4 text-rose-600" />,
  },
  Late: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    icon: <Clock4 className="h-4 w-4 text-amber-600" />,
  },
};

function StudentDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#121826]">Student Dashboard</h1>
          <p className="text-sm text-[#4B5563]">Welcome back, John Doe!</p>
        </div>
        <button
          type="button"
          className="self-end inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111827] shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#1E40FF] px-6 py-5 text-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <QrCode className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold">Scan QR Code</p>
              <p className="text-sm text-white/80">
                Mark your attendance for today&apos;s session
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white px-6 py-5 shadow-[0_15px_40px_-18px_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#1E40FF]">
              <Plus className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-[#111827]">Join Class</p>
              <p className="text-sm text-[#4B5563]">Enter class code to join a new course</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#111827]">My Classes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classCards.map((item) => (
            <div
              key={item.code}
              className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_15px_40px_-18px_rgba(0,0,0,0.35)] transition hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F3F6FF] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#1E40FF]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                  {item.code}
                </span>
              </div>
              <div className="relative mt-4 space-y-1">
                <p className="text-sm font-semibold text-[#0F172A]">{item.title}</p>
                <p className="text-sm text-[#4B5563]">{item.instructor}</p>
                <p className="text-xs text-[#9CA3AF]">{item.term}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-[#111827]">Attendance History</h2>

        <div className="hidden rounded-2xl bg-white shadow-[0_15px_40px_-18px_rgba(0,0,0,0.35)] md:block">
          <table className="w-full text-left">
            <thead className="text-sm text-[#6B7280]">
              <tr>
                <th className="px-6 py-4 font-medium">Class</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#111827]">
              {attendanceHistory.map((item, index) => {
                const status = statusMap[item.status];
                return (
                  <tr
                    key={`${item.className}-${item.date}-${index}`}
                    className="border-t border-[#F1F5F9] last:border-b-0"
                  >
                    <td className="px-6 py-4">{item.className}</td>
                    <td className="px-6 py-4 text-[#4B5563]">{item.date}</td>
                    <td className="px-6 py-4 text-[#4B5563]">{item.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}
                      >
                        {status.icon}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {attendanceHistory.map((item, index) => {
            const status = statusMap[item.status];
            return (
              <div
                key={`${item.className}-${item.date}-${index}`}
                className="rounded-2xl bg-white p-4 shadow-[0_15px_40px_-18px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#111827]">{item.className}</p>
                    <p className="text-xs text-[#4B5563]">
                      {item.date} · {item.time}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.text} ${status.border}`}
                  >
                    {status.icon}
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
