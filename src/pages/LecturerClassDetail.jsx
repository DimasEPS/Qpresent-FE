import React from "react";
import { useNavigate } from "react-router-dom";
import LecturerLayout from "@/layouts/LecturerLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Calendar, FileText } from "lucide-react";

// Mock data - sesuai dengan gambar
const classData = {
  title: "Data Structure & Algorithms",
  term: "Fall 2024",
};

const classMembers = [
  { name: "Alice Johnson", nim: "2021001", email: "alice@university.edu" },
  { name: "Bob Smith", nim: "2021002", email: "bob@university.edu" },
  { name: "Charlie Brown", nim: "2021003", email: "charlie@university.edu" },
  { name: "Diana Prince", nim: "2021004", email: "diana@university.edu" },
  { name: "Eve Wilson", nim: "2021005", email: "eve@university.edu" },
];

function LecturerClassDetail() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/lecturer");
  };

  return (
    <LecturerLayout title={classData.title} activeMenu="classes">
      {/* Back Button */}
      <Button
        onClick={handleBack}
        variant="outline"
        className="mb-6 rounded-full border-[1.5px] border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
        Back to Dashboard
      </Button>

      {/* Class Header Card */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-[#3B5CFF] to-[#5C7CFF] p-6 shadow-lg md:p-8">
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          {classData.title}
        </h2>
        <p className="text-base text-white/90 md:text-lg">{classData.term}</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <Button className="flex items-center justify-center gap-3 rounded-2xl bg-white py-6 text-[15px] font-semibold text-[#3B5CFF] shadow-sm transition-all hover:bg-[#F9FAFB] hover:shadow-md md:rounded-3xl md:py-7 md:text-base">
          <Users className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          Anggota Kelas
        </Button>
        <Button className="flex items-center justify-center gap-3 rounded-2xl bg-white py-6 text-[15px] font-semibold text-[#3B5CFF] shadow-sm transition-all hover:bg-[#F9FAFB] hover:shadow-md md:rounded-3xl md:py-7 md:text-base">
          <Calendar className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          Sesi Presensi
        </Button>
        <Button className="flex items-center justify-center gap-3 rounded-2xl bg-white py-6 text-[15px] font-semibold text-[#3B5CFF] shadow-sm transition-all hover:bg-[#F9FAFB] hover:shadow-md md:rounded-3xl md:py-7 md:text-base">
          <FileText className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
          Laporan
        </Button>
      </div>

      {/* Class Members Table */}
      <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-6 text-xl font-bold text-[#1F2937] md:text-2xl">
          Class Members ({classMembers.length})
        </h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#E5E7EB]">
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Name
                </th>
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  NIM
                </th>
                <th className="pb-4 text-left text-sm font-bold text-[#6B7280] md:text-base">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {classMembers.map((member, index) => (
                <tr
                  key={member.nim}
                  className={`border-b border-[#F3F4F6] transition-colors hover:bg-[#F9FAFB] ${
                    index === classMembers.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="py-5 text-sm text-[#1F2937] md:text-base">
                    {member.name}
                  </td>
                  <td className="py-5 text-sm text-[#6B7280] md:text-base">
                    {member.nim}
                  </td>
                  <td className="py-5 text-sm text-[#6B7280] md:text-base">
                    {member.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LecturerLayout>
  );
}

export default LecturerClassDetail;
