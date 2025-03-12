import { createContext, useContext, useState } from "react";

// ✅ Create the context
const ProjectContext = createContext(null);

// ✅ Custom hook to access context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === null) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

// ✅ Provider Component
export const ProjectProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    privacy: "",
    views: ["overview", "list"], // Default selected views
  });

  return (
    <ProjectContext.Provider value={{ formData, setFormData }}>
      {children}
    </ProjectContext.Provider>
  );
};
