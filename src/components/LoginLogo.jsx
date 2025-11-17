import React from "react";
import { GraduationCap } from "lucide-react";

function LoginLogo( { className = "" } ) {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center gap-4`}
    >
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
  );
}

export default LoginLogo;
