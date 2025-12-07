import React from "react";
import { ArrowRight, BookOpen, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function ClassCard({ title, code, students, sessions, term, onManage = () => {} }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between md:rounded-3xl md:p-6">
      <div className="flex items-start gap-2.5 md:items-center md:gap-4">
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#3B5CFF] to-[#5C7CFF] shadow-sm md:h-14 md:w-14 md:rounded-2xl">
          <BookOpen className="h-5 w-5 text-white md:h-7 md:w-7" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
          <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3">
            <h3 className="text-[13px] font-semibold leading-tight text-[#1F2937] md:text-lg">{title}</h3>
            <span className="w-fit rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B7280] md:px-3 md:py-1 md:text-xs">
              {code}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#6B7280] md:gap-4 md:text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 md:h-4 md:w-4" strokeWidth={2} />
              <span>{students} Students</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 md:h-4 md:w-4" strokeWidth={2} />
              <span>{sessions} Sessions</span>
            </div>
            <span className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-[10px] font-semibold md:px-2.5 md:py-1 md:text-xs">
              {term}
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={onManage}
        className="w-full shrink-0 rounded-full bg-linear-to-r from-[#3B5CFF] to-[#5C7CFF] px-5 py-2 text-xs font-semibold text-white shadow-md hover:shadow-lg md:w-auto md:px-6 md:py-2.5 md:text-sm"
      >
        Kelola
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:ml-2 md:h-4 md:w-4" strokeWidth={2.5} />
      </Button>
    </div>
  );
}

export default ClassCard;
