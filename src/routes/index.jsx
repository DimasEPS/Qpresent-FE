import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LecturerDashboard from "@/pages/LecturerDashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RoleSelection from "@/pages/RoleSelection";
import StudentDashboard from "@/pages/StudentDashboard";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/role-selection" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/lecturer" element={<LecturerDashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
