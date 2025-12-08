import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LecturerDashboard from "@/pages/LecturerDashboard";
import LecturerClassDetail from "@/pages/LecturerClassDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RoleSelection from "@/pages/RoleSelection";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentClassList from "@/pages/StudentClassList";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/role-selection" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/classes" element={<StudentClassList />} />
      <Route path="/lecturer" element={<LecturerDashboard />} />
      <Route path="/lecturer/class/:id" element={<LecturerClassDetail />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
