import {
  Divider,
  Drawer,
  ScrollAreaAutosize,
  SemiCircleProgress,
  useMantineTheme,
} from "@mantine/core";
import { BellDot, Clipboard, Home, Mail, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../index.css";

const ProjectDetails = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const formData = location.state?.formData || {};
  const theme = useMantineTheme();

  useEffect(() => {
    setOpened(true);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-white">
        Project Created Successfully!
      </h1>
      <p>
        <strong>Name:</strong> {formData.projectName}
      </p>
      <p>
        <strong>Privacy:</strong> {formData.privacy}
      </p>
      <p>
        <strong>Views:</strong> {formData.views?.join(", ")}
      </p>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Welcome Drawer"
        styles={{
          content: { backgroundColor: theme.colors.dark[9], color: "white" },
          header: { backgroundColor: theme.colors.dark[9], color: "white" },
        }}
      >
        {/* Create Section */}
        <div>
          <div className="flex items-center gap-2 justify-start cursor-pointer">
            <div className="flex items-center gap-2 p-2 rounded-3xl border border-gray-600 hover:bg-gray-800">
              <PlusCircle color="#60A5FA" size={20} />
              Create
            </div>
          </div>

          <div className="flex gap-2 p-4 mt-4 rounded-lg hover:bg-gray-900 cursor-pointer">
            <Home /> Home
          </div>
          <div className="flex gap-2 p-4 mt-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <Clipboard /> My tasks
          </div>
          <div className="flex gap-2 p-4 mt-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <BellDot /> Inbox
          </div>
        </div>

        <Divider color="#374151" className="my-3" />

        {/* Scrollable Project Section */}
        <div>
          <h2 className="text-lg font-bold mb-2">Projects</h2>
          <ScrollAreaAutosize
            style={{
              maxHeight: "250px",
              overflow: "hidden", // Hides outer scrollbar
            }}
            type="always"
            className="hide-scrollbar"
          >
            <div className="space-y-2 p-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700"
                >
                  Project {index + 1}
                </div>
              ))}
            </div>
          </ScrollAreaAutosize>
        </div>

        <Divider color="#374151" className="my-3" />

        {/* Improved Billing Section */}
        <div className="p-4 rounded-lg bg-gray-800 text-white flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-center">Advanced Free Trial</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            <SemiCircleProgress
              fillDirection="left-to-right"
              orientation="up"
              filledSegmentColor="blue"
              size={100}
              thickness={8}
              value={50}
              label="50%"
            />
            <span className="text-md text-gray-300">Usage Limit Reached: 50%</span>
          </div>
          <button className="bg-yellow-300 hover:bg-yellow-100 py-2 px-4 rounded-md text-blue-800 font-semibold w-full">
            Add Billing Info
          </button>
        </div>

        <Divider color="#374151" className="my-3" />

        {/* Invite Teammates Section */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 text-white cursor-pointer hover:bg-gray-700">
          <Mail /> Invite teammates
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectDetails;
