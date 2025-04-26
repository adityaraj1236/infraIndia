import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectManagerDashboard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: ""
  });
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const statusOptions = ["Not Started", "In Progress", "Completed", "Delayed"];

  // Fetch tasks associated with the project
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch project tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", newTask);
      setNewTask({ title: "", description: "", assignee: "", dueDate: "" });
      fetchTasks(); // refresh list
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      setUpdatingTaskId(taskId);
      await axios.put("/api/tasks/status", { taskId, status });
      fetchTasks(); // refresh list
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return (
    <div>
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
              {Array.isArray(tasks) && tasks.map((task, idx) => (
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
                  <td className="p-4 text-gray-600">{task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-4 text-gray-600">{task.endDate ? new Date(task.endDate).toLocaleDateString() : 'N/A'}</td>
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
  );
};

export default ProjectManagerDashboard;
