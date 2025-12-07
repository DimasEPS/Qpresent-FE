import React, { useState, useEffect } from "react";
import LecturerSidebar from "@/components/lecturer/LecturerSidebar";
import { Menu } from "lucide-react";

function LecturerLayout({ children, title, activeMenu = "dashboard" }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    }
  }, [isSidebarOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setSidebarOpen(false), 300);
  };

  const handleNavigate = (key) => {
    console.log("navigate", key);
    handleClose();
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F5F5F5]">
      {/* Desktop sidebar - Fixed */}
      <div className="fixed left-0 top-0 z-30 hidden h-screen md:block">
        <LecturerSidebar active={activeMenu} onNavigate={handleNavigate} onLogout={handleLogout} />
      </div>

      {/* Mobile overlay sidebar with animation */}
      {isSidebarOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
            role="button"
            tabIndex={-1}
            aria-label="Tutup menu"
          />
          <div
            className={`fixed left-0 top-0 z-50 h-full w-[85%] max-w-80 bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
              isAnimating ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <LecturerSidebar
              active={activeMenu}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              showClose
              onClose={handleClose}
            />
          </div>
        </>
      )}

      {/* Main content area */}
      <main className="min-h-screen w-full md:ml-[280px]">
        {/* Header */}
        {title && (
          <div className="bg-linear-to-r from-[#3B5CFF] to-[#5C7CFF]">
            <div className="flex items-center gap-2.5 px-4 py-5 md:px-8 md:pb-10 md:pt-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-full p-1.5 text-white hover:bg-white/10 md:hidden"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-white md:text-4xl">{title}</h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-5 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}

export default LecturerLayout;
