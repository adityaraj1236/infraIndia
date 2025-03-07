import { Button, Input, Modal, Divider } from "@mantine/core";
import { Card, Image, Text, Badge, Group } from "@mantine/core";
import { useState } from "react";

const Projects = () => {
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Pending", // Default status
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

    // Reset form
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
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Projects</h1>

      {/* Search and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search any project"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSection={value !== "" ? <Input.ClearButton onClick={() => setValue("")} /> : undefined}
            rightSectionPointerEvents="auto"
            size="sm"
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="text-sm">Filter</Button>
          <Button className="text-sm flex items-center gap-1" onClick={() => setIsModalOpen(true)}>
            <span className="text-lg uppercase">+</span>
            <span className="uppercase">Create a new Project</span>
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="border-none p-4 rounded-lg shadow space-y-2">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" height={160} alt="Project Image" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{project.name}</Text>
                  <Badge color={getStatusColor(project.status)}>{project.status}</Badge>
                </Group>

                <Text size="sm" c="dimmed">{project.description}</Text>

                <Text size="md" mt="mb" mb="xs" fw={500}>Start: {project.startDate || "N/A"}</Text>
                <Text size="md" mt="mb" mb="xs" fw={500}>End: {project.endDate || "N/A"}</Text>

                <Button color="blue" fullWidth mt="md" radius="md">View Details</Button>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No projects found. Please create one.</div>
        )}
      </div>

      {/* Modal */}
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project" centered size="lg">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
            <label className="w-28 font-medium">Project Name</label>
            <Input className="flex-1 w-full" placeholder="Enter the project title" name="name" value={projectForm.name} onChange={handleInputChange} required />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
            <label className="w-28 font-medium">Description</label>
            <Input className="flex-1 w-full" placeholder="Short Description" name="description" value={projectForm.description} onChange={handleInputChange} required />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
            <label className="w-28 font-medium">Start Date</label>
            <Input className="flex-1 w-full" type="date" name="startDate" value={projectForm.startDate} onChange={handleInputChange} />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
            <label className="w-28 font-medium">End Date</label>
            <Input className="flex-1 w-full" type="date" name="endDate" value={projectForm.endDate} onChange={handleInputChange} />
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
            <label className="w-28 font-medium">Status</label>
            <select className="flex-1 w-full border rounded px-2 py-1" name="status" value={projectForm.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="On Going">On Going</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Divider my="md" />

          <div className="flex w-full">
            <Button fullWidth onClick={handleCreateProject}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
