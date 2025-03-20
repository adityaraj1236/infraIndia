import { useState } from 'react';
import { Menu, Button, Select, ActionIcon, Text } from '@mantine/core';
import { Ellipsis, Plus, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectHomeRedirect = () => {
    const navigate = useNavigate();

    // Dummy Data (Replace with API data later)
    const [projects, setProjects] = useState([
        { id: "1", name: "Project Alpha", starred: true, recent: true },
        { id: "2", name: "Project Beta", starred: false, recent: true },
        { id: "3", name: "Project Gamma", starred: true, recent: false }
    ]);

    const [tasks, setTasks] = useState([
        { id: "101", name: "Task 1 - Alpha", projectId: "1" },
        { id: "102", name: "Task 2 - Alpha", projectId: "1" },
        { id: "103", name: "Task 1 - Beta", projectId: "2" },
        { id: "104", name: "Task 1 - Gamma", projectId: "3" }
    ]);

    const [selectedProject, setSelectedProject] = useState(projects[0]?.id || null);
    const [isHalfSize, setIsHalfSize] = useState(true);
    const [filter, setFilter] = useState("all"); // "all", "recent", "starred"

    // Filter projects based on selected filter
    const filteredProjects = filter === "recent" 
        ? projects.filter(p => p.recent) 
        : filter === "starred" 
        ? projects.filter(p => p.starred) 
        : projects;

    // Filter tasks based on selected project
    const filteredTasks = tasks.filter(task => task.projectId === selectedProject);

    const newProjectCreateHandler = () => {
        navigate("/projects/new/blank");
    };

    return (
        <div className="flex flex-col p-6 max-w-5xl mx-auto">
            <div className="text-gray-600 text-sm">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</div>
            <div className="text-xl font-semibold mt-2">Good Morning, <span className="text-blue-600">Aditya</span> 👋</div>

            {/* Project Selection & Actions */}
            <div className="flex flex-col md:flex-row md:items-center mt-6 gap-4">
                <div className="font-semibold text-lg">Projects</div>

                {/* Project Selector */}
                <Select
                    placeholder="Select Project"
                    data={filteredProjects.map(project => ({ value: project.id, label: project.name }))}
                    value={selectedProject}
                    onChange={setSelectedProject}
                    size="sm"
                    className="w-full md:w-56"
                />

                {/* Menu Options */}
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon variant="subtle" size="lg">
                            <Ellipsis size={24} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown className="p-2">
                        <Menu.Item onClick={newProjectCreateHandler} className="flex gap-2 items-center">
                            <Plus size={16} />
                            <span>New Project</span>
                        </Menu.Item>
                        <Menu.Item onClick={() => setIsHalfSize(true)}>Half Size</Menu.Item>
                        <Menu.Item onClick={() => setIsHalfSize(false)}>Full Size</Menu.Item>
                        <Menu.Item onClick={() => setFilter("recent")} className="flex gap-2 items-center">
                            <Clock size={16} />
                            <span>Recent Projects</span>
                        </Menu.Item>
                        <Menu.Item onClick={() => setFilter("starred")} className="flex gap-2 items-center">
                            <Star size={16} className="text-yellow-500" />
                            <span>Starred Projects</span>
                        </Menu.Item>
                        <Menu.Item onClick={() => setFilter("all")} className="flex gap-2 items-center">
                            <span>All Projects</span>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Tasks & Projects Display */}
            <div className={`mt-6 gap-4 ${isHalfSize ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'}`}>
                {/* Tasks Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 border">
                    <Text className="font-semibold text-lg">📌 Tasks for {projects.find(p => p.id === selectedProject)?.name || 'Selected Project'}</Text>
                    {filteredTasks.length ? (
                        <ul className="mt-2 space-y-1 text-gray-700">
                            {filteredTasks.map(task => (
                                <li key={task.id} className="text-sm border-l-4 border-blue-500 pl-2">{task.name}</li>
                            ))}
                        </ul>
                    ) : <Text size="sm" className="text-gray-500 mt-2">No tasks available for this project</Text>}
                </div>

                {/* Projects Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 border">
                    <Text className="font-semibold text-lg">📂 Projects</Text>
                    {filteredProjects.length ? (
                        <ul className="mt-2 space-y-1 text-gray-700">
                            {filteredProjects.map(project => (
                                <li key={project.id} 
                                    className="text-sm border-l-4 border-green-500 pl-2 cursor-pointer hover:text-blue-600" 
                                    onClick={() => setSelectedProject(project.id)}>
                                    {project.name}
                                </li>
                            ))}
                        </ul>
                    ) : <Text size="sm" className="text-gray-500 mt-2">No projects available</Text>}
                </div>
            </div>
        </div>
    );
};

export default ProjectHomeRedirect;
