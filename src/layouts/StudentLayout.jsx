import React, { useState } from "react";
import { Menu } from "lucide-react";

function StudentLayout({ children, title, activeMenu = "dashboard" }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (key) => {
    console.log("navigate", key);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5F5]">
      {/* Desktop sidebar - Fixed */}
      <div className="fixed left-0 top-0 hidden h-screen md:block">
        {/* TODO: Add StudentSidebar component */}
        <div className="h-full w-[280px] bg-white">
          <p className="p-4">Student Sidebar</p>
        </div>
      </div>

      {/* Mobile overlay sidebar with animation */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden"
            onClick={() => setSidebarOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Tutup menu"
          />
          <div
            className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden"
            style={{
              transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            {/* TODO: Add StudentSidebar component */}
            <div className="h-full bg-white">
              <p className="p-4">Student Sidebar</p>
            </div>
          </div>
        </>
      )}

      {/* Main content area */}
      <main className="w-full md:ml-[280px]">
        {/* Header */}
        {title && (
          <div className="bg-linear-to-r from-[#3B5CFF] to-[#5C7CFF] pb-8 pt-5 md:pb-10 md:pt-8">
            <div className="flex items-center gap-2.5 px-4 md:px-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-full p-1.5 text-white hover:bg-white/10 md:hidden"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-white md:text-4xl">
                {title}
              </h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-5 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}

export default StudentLayout;
