import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Text, Badge, Button, Input, Modal, List, Select, Progress, Group, NumberInput } from "@mantine/core";

const ProjectDetails = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", assignedTo: "", status: "Pending", priority: "Medium", progress: 0, skilledLabor: 0, unskilledLabor: 0, materials: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  useEffect(() => {
    const mockProjects = [
      {
        name: "Project Alpha",
        description: "Construction of a 5-story building",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        status: "On Going",
        tasks: [
          { name: "Foundation Work", assignedTo: "John Doe", status: "In Progress", priority: "High", progress: 40, skilledLabor: 10, unskilledLabor: 5, materials: "Cement, Steel" },
          { name: "Roof Installation", assignedTo: "Team A", status: "Pending", priority: "Medium", progress: 0, skilledLabor: 5, unskilledLabor: 3, materials: "Wood, Nails" },
        ],
      },
    ];

    const foundProject = mockProjects.find((proj) => proj.name === projectName);
    if (foundProject) {
      setProject(foundProject);
      setTasks(foundProject.tasks || []);
    }
  }, [projectName]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Pending": return "red";
      default: return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "red";
      case "Medium": return "orange";
      case "Low": return "blue";
      default: return "gray";
    }
  };

  const handleTaskSubmit = () => {
    if (!newTask.name.trim()) return;

    if (editTaskIndex !== null) {
      setTasks((prev) => prev.map((task, idx) => (idx === editTaskIndex ? newTask : task)));
      setEditTaskIndex(null);
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

    setNewTask({ name: "", assignedTo: "", status: "Pending", priority: "Medium", progress: 0, skilledLabor: 0, unskilledLabor: 0, materials: "" });
    setIsModalOpen(false);
  };

  const openEditTask = (index) => {
    setNewTask(tasks[index]);
    setEditTaskIndex(index);
    setIsModalOpen(true);
  };

  if (!project) return <div className="text-center text-gray-500 mt-10">Loading project details...</div>;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Button variant="light" onClick={() => navigate(-1)}>&larr; Back to Projects</Button>

      <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-6">
        <Text size="xl" fw={700}>{project.name}</Text>
        <Text size="md" c="dimmed">{project.description}</Text>
        <Badge color={getStatusColor(project.status)} className="mt-2">{project.status}</Badge>
        <Text size="sm" mt="md">Start Date: {project.startDate}</Text>
        <Text size="sm">End Date: {project.endDate}</Text>

        <div className="mt-6">
          <Text fw={600}>Project Tasks:</Text>
          {tasks.length > 0 ? (
            <List spacing="md">
              {tasks.map((task, index) => (
                <Card key={index} shadow="sm" padding="md" radius="md" withBorder className="mb-2">
                  <Group position="apart">
                    <Text fw={600}>{task.name}</Text>
                    <Badge color={getStatusColor(task.status)}>{task.status}</Badge>
                  </Group>
                  <Text size="sm">Assigned to: {task.assignedTo || "Not assigned"}</Text>
                  <Badge color={getPriorityColor(task.priority)} mt="xs">{task.priority} Priority</Badge>
                  <Text size="sm">Skilled Labor: {task.skilledLabor}</Text>
                  <Text size="sm">Unskilled Labor: {task.unskilledLabor}</Text>
                  <Text size="sm">Materials: {task.materials}</Text>
                  <Progress value={task.progress} mt="sm" size="sm" label={`${task.progress}%`} />
                  <Button size="xs" mt="sm" variant="outline" onClick={() => openEditTask(index)}>Edit</Button>
                </Card>
              ))}
            </List>
          ) : (
            <Text size="sm" c="dimmed">No tasks added yet.</Text>
          )}
        </div>

        <Button fullWidth mt="md" onClick={() => setIsModalOpen(true)}>+ Add Task</Button>
      </Card>

      {/* Add/Edit Task Modal */}
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title={editTaskIndex !== null ? "Edit Task" : "Add Task"} centered>
        <Input
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          mt="sm"
        />
        <Input
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          mt="sm"
        />
        <Select
          label="Status"
          data={["Pending", "In Progress", "Completed"]}
          value={newTask.status}
          onChange={(value) => setNewTask({ ...newTask, status: value })}
          mt="sm"
        />
        <Select
          label="Priority"
          data={["High", "Medium", "Low"]}
          value={newTask.priority}
          onChange={(value) => setNewTask({ ...newTask, priority: value })}
          mt="sm"
        />
        <NumberInput
          label="Progress (%)"
          value={newTask.progress}
          min={0}
          max={100}
          onChange={(value) => setNewTask({ ...newTask, progress: value })}
          mt="sm"
        />
        <NumberInput
          label="Skilled Labor"
          value={newTask.skilledLabor}
          min={0}
          onChange={(value) => setNewTask({ ...newTask, skilledLabor: value })}
          mt="sm"
        />
        <NumberInput
          label="Unskilled Labor"
          value={newTask.unskilledLabor}
          min={0}
          onChange={(value) => setNewTask({ ...newTask, unskilledLabor: value })}
          mt="sm"
        />
        <Input
          placeholder="Materials required"
          value={newTask.materials}
          onChange={(e) => setNewTask({ ...newTask, materials: e.target.value })}
          mt="sm"
        />
        <Button fullWidth mt="md" onClick={handleTaskSubmit}>{editTaskIndex !== null ? "Save Changes" : "Add Task"}</Button>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
