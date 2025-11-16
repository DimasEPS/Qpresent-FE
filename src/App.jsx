import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";

function App() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#F9FAFB] to-[#F3F4F6] flex flex-col items-center justify-center bg-background px-6 gap-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/role-selection" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/lecturer" element={<LecturerDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
