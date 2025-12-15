import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Layouts
import StudentLayout from "@/layouts/StudentLayout";
import LecturerLayout from "@/layouts/LecturerLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import VerifyDevice from "@/pages/auth/VerifyDevice";

// Student pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentProfile from "@/pages/student/Profile";
import JoinClass from "@/pages/student/JoinClass";
import ClassDetail from "@/pages/student/ClassDetail";
import ScanQR from "@/pages/student/ScanQR";

// Lecturer pages
import LecturerDashboard from "@/pages/lecturer/Dashboard";
import LecturerClasses from "@/pages/lecturer/Classes";
import CreateClass from "@/pages/lecturer/CreateClass";
import LecturerClassDetail from "@/pages/lecturer/ClassDetail";
import Sessions from "@/pages/lecturer/Sessions";
import CreateSession from "@/pages/lecturer/CreateSession";
import SessionDetail from "@/pages/lecturer/SessionDetail";
import LecturerReports from "@/pages/lecturer/Reports";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminClasses from "@/pages/admin/Classes";
import AdminUsers from "@/pages/admin/Users";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-device" element={<VerifyDevice />} />

      {/* Protected Student routes with Layout */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="join-class" element={<JoinClass />} />
        <Route path="class/:classId" element={<ClassDetail />} />
        <Route path="scan-qr" element={<ScanQR />} />
      </Route>

      {/* Protected Lecturer routes with Layout */}
      <Route
        path="/lecturer"
        element={
          <ProtectedRoute>
            <LecturerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="classes" element={<LecturerClasses />} />
        <Route path="classes/create" element={<CreateClass />} />
        <Route path="classes/:classId" element={<LecturerClassDetail />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="sessions/create" element={<CreateSession />} />
        <Route path="sessions/:sessionId" element={<SessionDetail />} />
        <Route path="reports" element={<LecturerReports />} />
      </Route>

      {/* Protected Admin routes with Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="classes/:classId" element={<LecturerClassDetail />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>