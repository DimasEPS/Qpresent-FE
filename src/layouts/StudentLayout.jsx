import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/student/Navbar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <main className="pb-20 md:pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
