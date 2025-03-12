import { Button, CloseButton, Input, Select } from "@mantine/core";
import { ArrowLeft, Check, LayoutDashboard, Calendar, BarChart, KanbanSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../../contextapi/ProjectContext";

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const {formData , setFormData} = useProject();

  const views = [
    { id: "overview", label: "Overview", description: "Align on project info and resources", icon: LayoutDashboard },
    { id: "list", label: "List (Required)", description: "Organize tasks in a powerful table", icon: LayoutDashboard },
    { id: "board", label: "Board", description: "Track work in a Kanban view", icon: KanbanSquare },
    { id: "timeline", label: "Timeline", description: "Schedule work over time", icon: Calendar },
    { id: "dashboard", label: "Dashboard", description: "Monitor project metrics and insights", icon: BarChart },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePrivacyChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      privacy: value,
    }));
  };

  const toggleView = (view) => {
    if (view === "list") return; // "List" is mandatory

    setFormData((prev) => ({
      ...prev,
      views: prev.views.includes(view)
        ? prev.views.filter((v) => v !== view) // Remove if already selected
        : [...prev.views, view], // Add if not selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Project Data:", formData);
    alert("Project Created Successfully! 🎉");
    navigate(`/project/${formData.projectName}` ,  {state:{formData}});
  };

  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <ArrowLeft className="cursor-pointer text-gray-700 hover:text-gray-900" size={24} onClick={goBack} />
          <CloseButton size="lg" variant="light" onClick={() => navigate("/")} />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">New Project</h1>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project Name</label>
                <Input
                  required
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Enter your project name"
                  className="w-full"
                />
              </div>

              {/* Privacy Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Privacy</label>
                <Select
                  placeholder="Select privacy level"
                  value={formData.privacy}
                  onChange={handlePrivacyChange}
                  data={[
                    { value: "public", label: "Public - Everyone can access" },
                    { value: "private", label: "Private - Only invited members can access" },
                  ]}
                  searchable
                />
              </div>

              {/* AI Setup */}
              <div className="border p-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <span>✨ Set up with InfraIndia AI</span>
              </div>

              {/* Next Step Button */}
              <div className="flex justify-center">
                <Button onClick={() => setStep(2)} disabled={!formData.projectName.trim()}>
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-2">Choose Views for your project</h2>
              <div className="text-gray-600 mb-4">InfraIndia recommended</div>

              {/* Views Selection */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {views.map(({ id, label, description, icon: Icon }) => (
                  <div
                    key={id}
                    className={`flex items-center p-4 border rounded-lg transition cursor-pointer shadow-sm hover:shadow-md ${
                      formData.views.includes(id) ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                    onClick={() => toggleView(id)}
                  >
                    {formData.views.includes(id) ? (
                      <Check className="text-blue-500 mr-3" size={20} />
                    ) : (
                      <Icon className="text-orange-500 mr-3" size={20} />
                    )}
                    <div>
                      <p className={`font-medium ${id === "list" ? "text-gray-500" : "text-gray-700"}`}>{label}</p>
                      <span className="text-sm text-gray-600">{description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" disabled={formData.views.length === 0}>
                  Create Project
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
