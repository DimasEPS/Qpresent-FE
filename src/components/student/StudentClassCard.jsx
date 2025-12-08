import React from "react";
import { BookOpen } from "lucide-react";

function StudentClassCard({
  title,
  code,
  instructor,
  term,
  onClick = () => {},
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl bg-white p-5 shadow-sm transition-all hover:shadow-md md:p-6"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#3B5CFF] to-[#5C7CFF] shadow-sm transition-transform group-hover:scale-105 md:h-16 md:w-16 md:rounded-[20px]">
          <BookOpen
            className="h-7 w-7 text-white md:h-8 md:w-8"
            strokeWidth={2}
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-tight text-[#1F2937] md:text-lg">
              {title}
            </h3>
            <span className="shrink-0 rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#6B7280] md:text-sm">
              {code}
            </span>
          </div>
          <p className="text-sm text-[#6B7280] md:text-base">{instructor}</p>
          <p className="text-xs text-[#9CA3AF] md:text-sm">{term}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentClassCard;
