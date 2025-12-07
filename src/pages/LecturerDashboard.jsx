import React from "react";
import LecturerLayout from "@/layouts/LecturerLayout";
import MetricCard from "@/components/lecturer/MetricCard";
import ClassCard from "@/components/lecturer/ClassCard";
import { BookOpen, Users, Calendar } from "lucide-react";

const metrics = [
  { label: "Total Kelas", value: 3, icon: BookOpen },
  { label: "Total siswa", value: 3, icon: Users },
  { label: "Total Sesi", value: 3, icon: Calendar },
];

const classList = [
  {
    title: "Data Structures & Algorithms",
    code: "CS201",
    students: 45,
    sessions: 12,
    term: "Fall 2024",
  },
  {
    title: "Data Structures & Algorithms",
    code: "CS201",
    students: 45,
    sessions: 12,
    term: "Fall 2024",
  },
  {
    title: "Data Structures & Algorithms",
    code: "CS201",
    students: 45,
    sessions: 12,
    term: "Fall 2024",
  },
];

function LecturerDashboard() {
  return (
    <LecturerLayout title="Dashboard" activeMenu="dashboard">
      {/* Metrics */}
      <div className="mb-6 grid grid-cols-3 gap-3 md:mb-8 md:gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Class List */}
      <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
        <h2 className="mb-5 text-xl font-bold text-[#1F2937] md:text-2xl">
          Daftar Kelas
        </h2>
        <div className="space-y-4">
          {classList.map((item, index) => (
            <ClassCard
              key={`${item.code}-${index}`}
              {...item}
              onManage={() => alert(`Kelola kelas ${item.code}`)}
            />
          ))}
        </div>
      </section>
    </LecturerLayout>
  );
}

export default LecturerDashboard;
