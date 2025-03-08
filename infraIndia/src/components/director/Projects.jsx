import { Button, Input, Modal, Divider, Select } from "@mantine/core";
import { Card, Image, Text, Badge, Group } from "@mantine/core";
import { useEffect, useState } from "react";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ name: "", status: "" });

  // Simulated API Call (Replace with actual API call when backend is ready)
  const fetchProjects = async () => {
    // Replace with actual fetch: await fetch("/api/projects").then(res => res.json())
    const mockProjects = [
      { name: "Project Alpha", description: "First project", startDate: "2024-01-01", endDate: "2024-06-01", status: "On Going" },
      { name: "Project Beta", description: "Second project", startDate: "2024-02-15", endDate: "2024-07-10", status: "Completed" },
    ];
    setProjects(mockProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Dynamic filtering for projects
  const filteredProjects = projects.filter((project) => {
    return (
      (filters.status ? project.status === filters.status : true) &&
      (filters.name ? project.name.toLowerCase().includes(filters.name.toLowerCase()) : true)
    );
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = () => {
    if (!projectForm.name || !projectForm.description) {
      alert("Please fill in all required fields.");
      return;
    }
    setProjects((prev) => [...prev, projectForm]);
    setIsModalOpen(false);
    setProjectForm({ name: "", description: "", startDate: "", endDate: "", status: "Pending" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "On Going":
        return "blue";
      default:
        return "orange";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Input
          placeholder="Search by project name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          name="name"
          size="sm"
          className="w-full md:w-1/3"
        />
        <Select
          placeholder="Filter by status"
          data={["", "Pending", "On Going", "Completed"]}
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value })}
          name="status"
          className="w-full md:w-1/3"
        />
        <Button className="text-sm" onClick={() => setIsModalOpen(true)}>+ Create Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" height={160} alt="Project Image" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{project.name}</Text>
                <Badge color={getStatusColor(project.status)}>{project.status}</Badge>
              </Group>
              <Text size="sm" c="dimmed">{project.description}</Text>
              <Text size="md" fw={500}>Start: {project.startDate || "N/A"}</Text>
              <Text size="md" fw={500}>End: {project.endDate || "N/A"}</Text>
              <Button color="blue" fullWidth mt="md" radius="md">View Details</Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No projects found.</div>
        )}
      </div>

      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project" centered size="lg">
        <div className="space-y-4">
          <Input placeholder="Project Name" name="name" value={projectForm.name} onChange={handleInputChange} required />
          <Input placeholder="Description" name="description" value={projectForm.description} onChange={handleInputChange} required />
          <Input type="date" name="startDate" value={projectForm.startDate} onChange={handleInputChange} />
          <Input type="date" name="endDate" value={projectForm.endDate} onChange={handleInputChange} />
          <Select
            data={["Pending", "On Going", "Completed"]}
            value={projectForm.status}
            onChange={(value) => setProjectForm({ ...projectForm, status: value })}
            name="status"
          />
          <Divider my="md" />
          <Button fullWidth onClick={handleCreateProject}>Create Project</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
