import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function RoleSelectionCard() {
  return (
    <Card className="w-[340px] rounded-3xl shadow-lg border-none bg-white p-2">
      <CardHeader>
        <CardTitle className="text-center text-[16px] font-medium text-[#1F2937]">
          Pilih Role Anda
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Button
          onClick={() => (window.location.href = "/login")}
          className="relative overflow-hidden w-full h-auto px-5 py-4 rounded-[14px] 
          text-white text-left flex flex-col items-start gap-1"
        >
          {/* linear bg transition */}
          <div className="absolute inset-0 bg-linear-to-b from-[#1E40FF] to-[#4A6FFF]"></div>
          <div className="absolute inset-0 bg-linear-to-b from-[#1b2876] to-[#2c376b] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"></div>
          {/* /linear bg transition */}

          <div className="relative z-10 font-semibold text-[15px] leading-snug">
            Mahasiswa
          </div>
          <div className="relative z-10 text-[13px] opacity-90 font-normal leading-snug">
            Tandai kehadiran Anda
          </div>
        </Button>

        <Button
          onClick={() => (window.location.href = "/login")}
          className="relative overflow-hidden w-full h-auto px-5 py-4 rounded-[14px] 
          text-white flex flex-col items-start gap-1"
        >
          {/* linear bg transition */}
          <div className="absolute inset-0 bg-linear-to-r from-[#364153] to-[#101828]"></div>
          <div className="absolute inset-0 bg-linear-to-r from-[#181d26] to-[#090e17] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out"></div>
          {/* /linear bg transition */}

          <div className="relative z-10 font-semibold text-[15px] leading-snug">
            Dosen
          </div>
          <div className="relative z-10 text-[13px] opacity-90 font-normal leading-snug">
            Kelola sesi kehadiran
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}

export default RoleSelectionCard;
