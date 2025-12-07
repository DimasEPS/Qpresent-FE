import React from "react";
import {
  BarChart3,
  BookOpen,
  CheckSquare,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "classes", label: "Daftar Kelas", icon: BookOpen },
  { key: "attendance", label: "Presensi", icon: CheckSquare },
  { key: "reports", label: "Laporan", icon: BarChart3 },
];

function LecturerSidebar({
  active = "dashboard",
  onNavigate = () => {},
  onLogout = () => {},
  showClose = false,
  onClose = () => {},
}) {
  return (
    <aside className="w-full md:w-[280px] md:min-h-screen bg-white">
      <div className="relative flex min-h-screen flex-col justify-between p-6 md:p-8">
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-[#6B7280] hover:bg-gray-100 md:hidden"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="space-y-10">
          {/* Logo and User Info */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-linear-to-br from-[#3B5CFF] to-[#5C7CFF] shadow-lg">
              <BookOpen className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1F2937] leading-tight">
                Lecturer Portal
              </h2>
              <p className="text-[15px] text-[#6B7280] mt-1">
                Prof. Michael Chen
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onNavigate(item.key)}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-3.5 text-[15px] font-medium transition-all ${
                    isActive
                      ? "bg-linear-to-r from-[#3B5CFF] to-[#5C7CFF] text-white shadow-[0_8px_24px_-6px_rgba(59,92,255,0.5)]"
                      : "text-[#4B5563] hover:bg-[#F3F4F6]"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full rounded-2xl border-[1.5px] border-[#E5E7EB] py-6 text-[15px] font-medium text-[#374151] shadow-none hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
        >
          <LogOut className="mr-3 h-5 w-5" strokeWidth={2} />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default LecturerSidebar;
