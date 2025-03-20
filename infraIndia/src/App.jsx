import { useState } from "react";
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
import ProjectDetails from "./components/projects/ProjectDetails"; // Import the new component
import CreateProjectForm from "./components/projects/CreateProjectForm";
import ProjectHomeRedirect from "./components/projects/ProjectHomeRedirect";
import { useProject } from "./contextapi/ProjectContext";
// import ProjectDashboard from "./components/projects/ProjectDashboard";

const App = () => {
  const [projectViews, setProjectViews] = useState(["overview", "list"]); // Default required views
  const {projectName , formData} =  useProject()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordEmailPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<FinanceOverview />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new/blank" element={<CreateProjectForm/>}/>
        <Route path="/project/:projectName" element={<ProjectDetails />} /> {/* Dynamic route */}
        <Route path={`/${formData.projectName}/home`} element={<ProjectHomeRedirect/>} /> {/* Dynamic route */}

        {/* <Route path="/project/:tab" element={<ProjectDashboard selectedViews={projectViews} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
