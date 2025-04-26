import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button, Input } from '@mantine/core';

const AdminProjectDetails = () => {
  const [showEmail, setShowEmail] = useState(false);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [newManager, setNewManager] = useState({ name: '', email: '' });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [newBoqItem, setNewBoqItem] = useState({
    category: "",
    description: "",
    quantity: "",
    unit: "",
    totalPrice: "",
    supplier: "",
  });

  const handleBoqInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoqItem(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProject(res.data))
      .catch(err =>
        console.error("❌ API Error:", err.response?.data || err.message)
      );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks/status-options")
      .then(res => setStatusOptions(res.data))
      .catch(err =>
        console.error("Failed to fetch status options:", err)
      );
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setUpdatingTaskId(taskId);

    axios
      .patch(
        `http://localhost:5000/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => fetchProject())
      .catch(err =>
        console.error("❌ Error updating task status:", err.response?.data || err.message)
      )
      .finally(() => setUpdatingTaskId(null));
  };

  const sendInvitation = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage");
      return;
    }

    const { name, email } = newManager;
    axios
      .post(
        `http://localhost:5000/api/invites/projects/${projectId}/invite`,
        { name, email, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("✅ Invitation sent:", res.data);
        alert('Invitation has been sent to the new Project Manager!');
        setIsDrawerOpen(false);
        setNewManager({ name: '', email: '' });
      })
      .catch((err) => {
        console.error("❌ Error sending invitation:", err.response?.data || err.message);
      });
  };

  if (!project) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold text-gray-600 flex items-center">
        <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading project details...
      </div>
    </div>
  );

  const completedTasks = project.tasks?.filter(task => task.status === "Completed").length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full">
              {project.status}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-800 font-medium">{project.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Timeline</h3>
              <p className="text-gray-800 font-medium">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Budget</h3>
              <p className="text-gray-800 font-medium">₹ {Number(project.budget?.toString()).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
            </div>
          </div>
        </div>

        {/* Project Team Section */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Project Team</h3>
            <Button 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {isDrawerOpen ? 'Cancel' : 'Update Project Manager'}
            </Button>
          </div>
          
          {/* Manager Info */}
          <div className="mb-6">
            {project.projectManager && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg mb-3">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {project.projectManager.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{project.projectManager.name}</div>
                  <div className="text-sm text-gray-600">Project Manager {showEmail && `(${project.projectManager.email})`}</div>
                </div>
                <button 
                  onClick={() => setShowEmail(!showEmail)}
                  className="ml-auto text-blue-600 hover:text-blue-800 text-sm"
                >
                  {showEmail ? 'Hide Email' : 'Show Email'}
                </button>
              </div>
            )}

            {project.siteSupervisor && (
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {project.siteSupervisor.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{project.siteSupervisor.name}</div>
                  <div className="text-sm text-gray-600">Site Supervisor ({project.siteSupervisor.email})</div>
                </div>
              </div>
            )}
          </div>

          {/* New Manager Form */}
          {isDrawerOpen && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <h4 className="text-lg font-medium mb-3 text-gray-700">Add New Project Manager</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Manager Name"
                  value={newManager.name || ''}
                  onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                  className="p-2 border rounded-md"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Manager Email"
                  value={newManager.email || ''}
                  onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
                  className="p-2 border rounded-md"
                />
                <Button 
                  onClick={sendInvitation}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Send Invitation
                </Button>
              </div>
            </div>
          )}

          {/* Assigned Users List */}
          <h4 className="text-lg font-medium mb-3 text-gray-700">Team Members</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(project.assignedUsers) && project.assignedUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex-shrink-0">
                  <span className="inline-block w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{user.name || user.email}</span>
                  <span className="text-sm text-gray-600">{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Report */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Progress Report</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-600 font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-indigo-800">{totalTasks}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-800">{completedTasks}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Progress</p>
              <p className="text-3xl font-bold text-blue-800">{progressPercentage}%</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* BOQ Table */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">BOQ Items</h3>
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Unit</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(project.boq) && project.boq.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                    <td className="p-4 font-medium text-gray-700">{item.category}</td>
                    <td className="p-4 text-gray-600">{item.description}</td>
                    <td className="p-4 text-center">{item.quantity}</td>
                    <td className="p-4 text-center">{item.unit}</td>
                    <td className="p-4 font-medium">₹{item.totalPrice}</td>
                    <td className="p-4">
                      {item.supplier?.name
                        ? <span className="text-blue-600">{item.supplier.name} <span className="text-gray-500 text-xs">({item.supplier.email})</span></span>
                        : <span className="text-gray-400">N/A</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Tasks</h3>
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">End Date</th>
                  <th className="p-4">Duration</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(project.tasks) && project.tasks.map((task, idx) => (
                  <tr key={task._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                    <td className="p-4 font-medium text-gray-700">{task.title}</td>
                    <td className="p-4">
                      {task.assignedTo?.name || task.assignedTo?.email || task.assignedTo || 
                        <span className="text-gray-400">N/A</span>}
                    </td>
                    <td className="p-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        disabled={updatingTaskId === task._id}
                        className={`p-2 rounded-md border shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full
                          ${task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                            task.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            task.status === 'Not Started' ? 'bg-gray-50 text-gray-700 border-gray-200' :
                            task.status === 'Delayed' ? 'bg-red-50 text-red-700 border-red-200' :
                            'border-gray-300'}`}
                      >
                        {statusOptions.map((status, idx) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {updatingTaskId === task._id && (
                        <div className="flex justify-center mt-1">
                          <div className="animate-pulse text-xs text-blue-600">Updating...</div>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-600">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      {task.duration ? <span className="font-medium">{task.duration} days</span> : 
                        <span className="text-gray-400">N/A</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectDetails;