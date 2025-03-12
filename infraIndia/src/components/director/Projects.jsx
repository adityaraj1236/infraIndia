import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate  = useNavigate();
  const newProjectHandler = () => {
    navigate("/projects/new/blank");
    console.log("redirected to project form") //form creation
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <div className="select-none">
        <h1 className="text-3xl font-semibold">Create a new project</h1>
        <p className="text-lg text-gray-600 mt-1">How would you like to start?</p>
      </div>
      <div className="mt-6 flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-md cursor-pointer hover:border-gray-600  select-none" onClick={newProjectHandler}>
        <Plus size={32} className="text-gray-500" />
        <div className="mt-2 font-medium text-gray-700">Blank Project</div>
        <div className="text-sm text-gray-500">Start from scratch</div>
      </div>
    </div>
  );
};

export default Project;
