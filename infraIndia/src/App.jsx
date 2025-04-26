import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import PricePage from "./components/staticPages/PricePage";
import ForgotPasswordEmailPage from "./components/auth/ForgotPasswordEmailPage";
import VerifyOtpPage from "./components/auth/VerifyOtpPage";
import ResetPassword from "./components/auth/ResetPassword";

import Dashboard from "./components/director/Dashboard";
import FinanceOverview from "./components/director/FinanceOverview";
import Projects from "./components/director/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import ProjectHomeRedirect from "./components/projects/ProjectHomeRedirect";
import AdminProjectDetails from "./pages/AdminProjectDetails"
import  InvitePage from "./pages/InvitePage"

import { useProject } from "./contextapi/ProjectContext";

// Role-based dashboards
import AdminDashboard from "./components/roles/AdminDashboard";
import EngineerDashboard from "./components/roles/EngineerDashboard";
import UserDashboard from "./components/roles/UserDashboard";
import ProjectManagerDashboard from "./components/roles/ProjectManagerDashboard";
import VendorDashboard  from "./components/roles/VendorDashboard";

// Protected route component
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const [msg, setMsg] = useState("Checking connection...");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/ping")
  //     .then((res) => setMsg(res.data.message))
  //     .catch((err) => {
  //       console.error("Backend error:", err.response?.data || err.message);
  //       setMsg("❌ Backend not connected!");
  //     });
  // }, []);

  const { projectName, formData } = useProject();

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordEmailPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          

          {/* General dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/invite/handle" element =  {<InvitePage/>}/>

          {/* ✅ Role-based protected routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engineer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["engineer"]}>
                <EngineerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/project-manager-dashboard" element={
            <ProtectedRoute allowedRoles={["projectmanager"]}>
            <ProjectManagerDashboard />
            </ProtectedRoute>
            } />

          <Route path="/vendor-dashboard" element={
            <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorDashboard/>
            </ProtectedRoute>
            } />

          {/* Project Routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new/blank" element={<CreateProjectForm />} />
          <Route path="/project/:projectName" element={<ProjectDetails />} />
          <Route path={`/${formData.projectName}/home`} element={<ProjectHomeRedirect />} />
        </Routes>
      </Router>

      {/* <p>{msg}</p> */}
    </>
  );
};

export default App;
