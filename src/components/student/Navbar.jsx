import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Home, QrCode, User, LogOut, Menu, X, Plus } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { data: profileData } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = profileData?.data;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Beranda",
      path: "/student/dashboard",
      icon: Home,
    },
    {
      name: "Gabung Kelas",
      path: "/student/join-class",
      icon: Plus,
    },
    {
      name: "Scan QR",
      path: "/student/scan-qr",
      icon: QrCode,
    },
    {
      name: "Profil",
      path: "/student/profile",
      icon: User,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Qpresent
                </h1>
                <p className="text-xs text-gray-500">Portal Mahasiswa</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className={
                      isActive(item.path)
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
            </div>

            {/* User Info & Logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                  {user?.user?.full_name || user?.full_name || "Loading..."}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[150px]">
                  {user?.user?.email || user?.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                );
              })}

              {/* Mobile User Info */}
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="px-3 py-2 bg-gray-50 rounded-lg mb-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.user?.full_name || user?.full_name || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.user?.email || user?.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate max-w-full">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
