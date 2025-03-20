import {
  Divider,
  Drawer,
  ScrollAreaAutosize,
  SemiCircleProgress,
  useMantineTheme,
  HoverCard,
  Button,
  Text,
  Group,
  Avatar,
  Tabs
} from "@mantine/core";
import {
  BellDot,
  ChartColumnBigIcon,
  Clipboard,
  Home,
  Mail,
  Plus,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Folder,
  MapPin,
  Users,
  UserPlus,
  FileText,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation  , Link} from "react-router-dom";
import "../../index.css";
import { useProject } from "../../contextapi/ProjectContext";


const ProjectDetails = () => {
  const {formData , setFormData} = useProject();
  const [opened, setOpened] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false); // State to toggle Reporting
  const [projectOpen, setProjectOpen] = useState(false); // State to toggle Reporting
  const location = useLocation();
  // const formData = location.state?.formData || {};
  const theme = useMantineTheme();

  useEffect(() => {
    setOpened(true);
  }, []);

  return (
    <div className="flex">
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        styles={{
          content: { backgroundColor: theme.colors.dark[9], color: "white" },
          header: { backgroundColor: theme.colors.dark[9], color: "white" },
        }}
        size="20%"
  withOverlay={false}  // Removes the background overlay
  withinPortal={false} // Allows interaction with the background
  trapFocus={false} // Enables clicking background elements
  closeOnClickOutside={false} // Prevents auto-close when clicking outside
      >
        {/* Create Section */}
        <div>
          <div className="flex items-center gap-2 justify-start cursor-pointer">
            <div className="flex items-center gap-2 p-2 rounded-3xl border border-gray-600 hover:bg-gray-800">
              <PlusCircle color="#60A5FA" size={20} />
              Create
            </div>
          </div>


          <Link to={`/${formData.projectName}/home`}>
          <div className="flex gap-2 p-4 mt-4 rounded-lg hover:bg-gray-900 cursor-pointer">
            <Home /> Home
          </div>
          </Link>
          <div className="flex gap-2 p-4 mt-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <Clipboard /> My tasks
          </div>
          <div className="flex gap-2 p-4 mt-2 rounded-lg hover:bg-gray-900 cursor-pointer">
            <BellDot /> Inbox
          </div>
        </div>

        <Divider color="#374151" className="my-3" />

        {/* Scrollable Project Section */}
        <div className="flex flex-col">
          <ScrollAreaAutosize
            style={{
              maxHeight: "250px",
              overflow: "hidden", // Hides outer scrollbar
            }}
            type="always"
            className="hide-scrollbar"
          >
            {/* Insights Section with Tree Structure */}
            <div className="flex flex-col">
              {/* Insights - Clickable with Arrow */}
              <div
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-900 cursor-pointer"
                onClick={() => setInsightsOpen(!insightsOpen)}
              >
                <span className="flex items-center gap-2">
                   Insights
                </span>
                {insightsOpen ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Reporting - Shown when Insights is open */}
              {insightsOpen && (
                <>
                <div className="pl-6 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                  <ChartColumnBigIcon /> Reporting
                </div>
                <div className="pl-6 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                  <Folder/> Portfolios
                </div>
                <div className="pl-6 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                  <MapPin/> Goals
                </div>
                </>
              )}
            </div>

            {/* Project section with Tree Structure */}
            <div className="flex flex-col">
              {/* Projects - Clickable with Arrow */}
              <div
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-900 cursor-pointer"
                onClick={() => setProjectOpen(!projectOpen)}
              >
                <span className="flex items-center gap-2">
                   Projects
                </span>
                {projectOpen ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Reporting - Shown when Insights is open */}
              {projectOpen && (
                <>
                <div className="pl-6 flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                  {formData.projectName}
                </div>
              
                </>
              )}


              {/* Team Section  with Tree structure */}
              <div className="flex flex-col relative">
              <div>
                Team
              </div>
              <div className="flex gap-2 mt-4 mb-4">
              <Users/>
              <Group justify="center">
            <HoverCard width={320}  height={720} shadow="md">
          <HoverCard.Target>
          <div>My workspace</div>
          </HoverCard.Target>
          <div className="absolute left-[20%]">
          <HoverCard.Dropdown>
          <div>
            <div>My workspace</div>
            <div className="flex flex-col">
              <div className="flex gap-1 justify-between mt-3">
                <div className="flex gap-2 cursor-pointer">
                  <UserPlus/>
                  Invite teammates
                </div>
                <Avatar
                  src="https://images.pexels.com/photos/14364849/pexels-photo-14364849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with your image URL
      alt="Profile"
      radius="xl" // Makes it circular
      size="sm" // Size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
                />
              </div>
              <div className="flex gap-2 mt-3 mb-3">
              <FileText/>
                <p>Create Project</p>
              </div>
            </div>
            <Divider/>
            <div>{formData.projectName}</div>
          </div>
        </HoverCard.Dropdown>
        </div>
          </HoverCard>
    </Group>
              </div>

              </div>
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
            <span className="text-md text-gray-300">Free Tier Limit Reached: 50%</span>
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
    <div className="flex ml-[30%] mt-4 justify-between w-[70%]  mr-4">
  {/* Left Section: My Workspace & Star */}
  <div className="flex items-center gap-3">
    <Avatar />
    <span className="text-2xl font-bold">My workspace</span>
    <Star size={20} />
  </div>

  {/* Right Section: Overview, Avatar & Invite Button */}
  <div className="flex flex-col">
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <Avatar />
      <Button>Invite</Button>
    </div>
  </div>
  {/* Tabs Section */}
 
 {
  formData.views.length> 0  &&  (
    <Tabs deafultValue={formData.views[0]?.value?? formData.views[0]}>
    <Tabs.List>
      {formData.views.map((view , index)=>(
        <Tabs.Tab 
          key={index} 
          value={typeof view === "string" ? view : view.value}
        >
          {typeof view === "string" ? view.charAt(0).toUpperCase() + view.slice(1) : view.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
    {formData.views.map((view, index) => (
    <Tabs.Panel 
      key={index} 
      value={typeof view === "string" ? view : view.value}
    >
      {/* Content for the tab */}
      <p>{`Content for ${typeof view === "string" ? view : view.label}`}</p>
    </Tabs.Panel>
  ))}
    </Tabs>

  )
 }
</div>
</div>

    </div>
  );
};

export default ProjectDetails;
