import React from "react";
import { BookOpen } from "lucide-react";

function MetricCard({ label, value, icon: Icon = BookOpen }) {
  return (
    <div className="flex h-[105px] w-full flex-col justify-between rounded-2xl bg-linear-to-br from-[#3B5CFF] to-[#5C7CFF] p-3 text-white shadow-[0_8px_24px_-8px_rgba(59,92,255,0.5)] md:h-[140px] md:rounded-3xl md:p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm md:h-12 md:w-12 md:rounded-2xl">
        <Icon className="h-4 w-4 md:h-6 md:w-6" strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[11px] font-medium opacity-90 md:text-base">{label}</p>
        <p className="text-3xl font-bold md:text-5xl">{value}</p>
      </div>
    </div>
  );
}

export default MetricCard;
