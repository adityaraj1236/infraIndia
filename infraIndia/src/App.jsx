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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Direct (top-level) routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/pricing" element={<PricePage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordEmailPage />} />
        <Route path ="/verify-otp" element={<VerifyOtpPage />} />
        <Route path= "/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin-dashboard" element={<FinanceOverview/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
    </Router>
  );
};

export default App;
