// components/auth/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("👋 Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500); // slight delay for toast
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
