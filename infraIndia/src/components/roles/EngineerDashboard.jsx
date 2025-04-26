// components/roles/EngineerDashboard.jsx
import LogoutButton from "../auth/LogoutButton";

const EngineerDashboard = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Engineer Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Dashboard content */}
    </div>
  );
};

export default EngineerDashboard;
