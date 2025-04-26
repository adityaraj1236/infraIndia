import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import {
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineLocationMarker,
  HiPlus,
  HiX,
} from "react-icons/hi";
import {
  FiMapPin,
  FiMap,
  FiGlobe,
  FiHome,
  FiFolder,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [organization, setOrganization] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editedOrg, setEditedOrg] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newProject, setNewProject] = useState({
      name :"",
      description: "",
      startDate: "",
      endDate : "",
      assignedUsers : "",
      projectManager : "",
      status : "pending",
      budget : "",
      location : "",
  });

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/organizations/my-organization",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrganization(response.data.organization);
        setEditedOrg(response.data.organization);
      } catch (error) {
        toast.error("Unable to fetch organization");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganization();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/projects/my-organization-projects",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(response.data.projects);
    } catch (error) {
      toast.error("Unable to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDoubleClick = (field) => setEditingField(field);

  const handleChange = (field, value) => {
    setEditedOrg((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setEditedOrg((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/organizations/update", editedOrg, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Organization updated successfully!");
      setOrganization(editedOrg);
      setEditingField(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleProjectCreate = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post("http://localhost:5000/api/projects/create", {
        ...newProject,
        organizationId: organization._id,
        assignedUsers: newProject.assignedUsers.split(',').map(email => ({ email: email.trim() })),
        projectManager: { email: newProject.projectManager },
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success("Project created successfully!");
      setProjects(prev => [...prev, response.data]);
      setIsDrawerOpen(false);
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        assignedUsers: "",
        projectManager: "",
        status: "pending",
        budget: "",
        location: "",
      });
    } catch (error) {
      // console.error(error);
      console.log(error);
      toast.error("Failed to create project");
    }
  };
  

  const addressFields = [
    { key: "street", icon: <FiHome />, label: "Street" },
    { key: "city", icon: <FiMap />, label: "City" },
    { key: "state", icon: <FiGlobe />, label: "State" },
    { key: "postalCode", icon: <FiMapPin />, label: "Pincode" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>

      {loading ? (
        <p>Loading organization...</p>
      ) : organization ? (
        <>
          {/* Organization Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <div className="flex-1 space-y-2" onDoubleClick={() => handleDoubleClick("name")}>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineOfficeBuilding className="text-blue-600" /> Name
                </label>
                {editingField === "name" ? (
                  <input
                    value={editedOrg.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md text-sm shadow-sm"
                  />
                ) : (
                  <p className="cursor-pointer">{organization.name}</p>
                )}
              </div>

              <div className="flex-1 space-y-2" onDoubleClick={() => handleDoubleClick("description")}>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineDocumentText className="text-blue-600" /> Description
                </label>
                {editingField === "description" ? (
                  <textarea
                    value={editedOrg.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md text-sm resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="cursor-pointer">{organization.description}</p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <HiOutlineLocationMarker className="text-blue-600" /> Address
                </label>
                {addressFields.map(({ key, icon, label }) => (
                  <div key={key} onDoubleClick={() => handleDoubleClick(key)}>
                    <span className="text-xs text-gray-500 flex items-center gap-1">{icon} {label}</span>
                    {editingField === key ? (
                      <input
                        value={editedOrg.address?.[key] || ""}
                        onChange={(e) => handleAddressChange(key, e.target.value)}
                        className="w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-md text-sm"
                      />
                    ) : (
                      <p className="cursor-pointer">{organization.address?.[key] || "—"}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {editingField && (
              <div className="pt-6 text-right">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Project Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-6xl mx-auto relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <FiFolder className="text-blue-600" /> Projects
              </h2>
              <button
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                onClick={() => setIsDrawerOpen(true)}
              >
                <HiPlus size={20} />
              </button>
            </div>

            {projects.length === 0 ? (
              <p className="text-gray-600 text-sm">No projects found.</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Link to={`/projects/${project._id}`} key={project._id}>
                    <li className="p-4 rounded-lg border border-gray-200 hover:shadow transition">
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.description || "No description available"}</p>
                      <div className="text-xs text-gray-400 mt-2">Status: {project.status}</div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          {isDrawerOpen && (
  <div className="fixed right-0 top-0 w-full max-w-md bg-white h-full shadow-lg z-50 p-6 overflow-y-auto">
    <HiX
      className="cursor-pointer absolute top-4 right-4 text-gray-600"
      onClick={() => setIsDrawerOpen(false)}
    />
    <h2 className="text-xl font-bold mb-6">Create New Project</h2>

    {/* Project Name */}
    <input
      type="text"
      placeholder="Project Name"
      value={newProject.name}
      onChange={e => setNewProject({ ...newProject, name: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* Description */}
    <textarea
      placeholder="Project Description"
      value={newProject.description}
      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
      className="w-full border p-2 mb-4 rounded resize-none"
      rows={4}
    />

    {/* Start Date */}
    <input
      type="date"
      value={newProject.startDate}
      onChange={e => setNewProject({ ...newProject, startDate: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* End Date */}
    <input
      type="date"
      value={newProject.endDate}
      onChange={e => setNewProject({ ...newProject, endDate: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* Assigned Users (comma separated emails) */}
    <input
      type="text"
      placeholder="Assigned Users (comma separated emails)"
      value={newProject.assignedUsers}
      onChange={e => setNewProject({ ...newProject, assignedUsers: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* Project Manager Email */}
    <input
      type="email"
      placeholder="Project Manager Email"
      value={newProject.projectManager}
      onChange={e => setNewProject({ ...newProject, projectManager: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* Status Dropdown */}
    <select
      value={newProject.status}
      onChange={e => setNewProject({ ...newProject, status: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    >
      <option value="pending">Pending</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>

    {/* Budget */}
    <input
      type="number"
      placeholder="Budget (₹)"
      value={newProject.budget}
      onChange={e => setNewProject({ ...newProject, budget: e.target.value })}
      className="w-full border p-2 mb-4 rounded"
    />

    {/* Location */}
    <input
      type="text"
      placeholder="Location"
      value={newProject.location}
      onChange={e => setNewProject({ ...newProject, location: e.target.value })}
      className="w-full border p-2 mb-6 rounded"
    />

    {/* Submit Button */}
    <button
      onClick={handleProjectCreate}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Create Project
    </button>
  </div>
)}

        </>
      ) : (
        <p>No organization found for this admin.</p>
      )}


    </div>
  );
};

export default AdminDashboard;
