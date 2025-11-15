import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleSelectionCard from "@/components/RoleSelectionCard";

function RoleSelection() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#F9FAFB] to-[#F3F4F6] flex flex-col items-center justify-center bg-background px-6 gap-8">
      {/* Main Logo Container */}
      <div className="flex flex-col items-center justify-center gap-4">
        {/* icon section */}
        <div className="w-20 h-20 rounded-3xl bg-linear-to-b from-[#4F46E5] to-[#6366F1] flex items-center justify-center shadow-lg">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>

        {/* title */}
        <h1 className="text-[18px] text-[#101828] font-medium tracking-tight">
          Qpresent
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Sistem Absensi QR code + Verifikasi GPS
        </p>
      </div>

      {/* Role Selection Card */}
      <RoleSelectionCard />
    </div>
  );
}

export default RoleSelection;
