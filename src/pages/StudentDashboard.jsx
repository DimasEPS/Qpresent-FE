import React from "react";
import StudentLayout from "@/layouts/StudentLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Plus, QrCode, XCircle } from "lucide-react";

const attendanceHistory = [
  {
    className: "Data Structures",
    date: "2024-11-14",
    time: "09:00",
    status: "Present",
  },
  {
    className: "Web Development",
    date: "2024-11-13",
    time: "14:00",
    status: "Present",
  },
  {
    className: "Database Systems",
    date: "2024-11-13",
    time: "10:00",
    status: "Absent",
  },
  {
    className: "Data Structures",
    date: "2024-11-12",
    time: "09:00",
    status: "Present",
  },
  {
    className: "Web Development",
    date: "2024-11-11",
    time: "14:00",
    status: "Late",
  },
];

const statusConfig = {
  Present: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: CheckCircle2,
  },
  Absent: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    icon: XCircle,
  },
  Late: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: Clock,
  },
};

function StudentDashboard() {
  return (
    <StudentLayout title="Student Dashboard" activeMenu="dashboard">
      {/* Welcome Message */}
      <div className="mb-6">
        <p className="text-base text-[#6B7280] md:text-lg">
          Welcome back, John Doe!
        </p>
      </div>

      {/* Action Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Scan QR Code Card */}
        <div className="group cursor-pointer rounded-3xl bg-linear-to-br from-[#3B5CFF] to-[#5C7CFF] p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 md:h-16 md:w-16">
              <QrCode
                className="h-7 w-7 text-white md:h-8 md:w-8"
                strokeWidth={2}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-white md:text-xl">
                Scan Qr Code
              </h3>
              <p className="text-sm text-white/90 md:text-base">
                Mark your attendance for today's session
              </p>
            </div>
          </div>
        </div>

        {/* Join Class Card */}
        <div className="group cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#3B5CFF] transition-transform group-hover:scale-110 md:h-16 md:w-16">
              <Plus className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-[#1F2937] md:text-xl">
                Join Class
              </h3>
              <p className="text-sm text-[#6B7280] md:text-base">
                Enter class code to join new class
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-[#1F2937] md:text-2xl">
          Attendance History
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#E5E7EB]">
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Class
                </th>
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Date
                </th>
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Time
                </th>
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, index) => {
                const config = statusConfig[record.status];
                const StatusIcon = config.icon;
                return (
                  <tr
                    key={`${record.className}-${record.date}-${index}`}
                    className={`border-b border-[#F3F4F6] transition-colors hover:bg-[#F9FAFB] ${
                      index === attendanceHistory.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-5 text-sm text-[#1F2937] md:text-base">
                      {record.className}
                    </td>
                    <td className="py-5 text-sm text-[#6B7280] md:text-base">
                      {record.date}
                    </td>
                    <td className="py-5 text-sm text-[#6B7280] md:text-base">
                      {record.time}
                    </td>
                    <td className="py-5">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${config.bg}`}
                      >
                        <StatusIcon className="h-4 w-4" strokeWidth={2} />
                        <span
                          className={`text-sm font-semibold ${config.text}`}
                        >
                          {record.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;
