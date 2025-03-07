import { Burger, Drawer, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Tree data
const data = [
  {
    value: "Platform",
    label: "Platform",
    children: [
      { value: "Platform/ProjectTracking", label: "ProjectTracking" },
      {
        value: "Platform/DocumentManagement",
        label: "Document Management & Collaboration",
      },
      {
        value: "Platform/ResourceManagement",
        label: "Resource & Equipment Management",
      },
    ],
  },
  {
    value: "Resources",
    label: "Resources",
    children: [
      { value: "Resources/Customers", label: "Customers" },
      { value: "Resources/Blog", label: "Blog" },
      { value: "Resources/Guides", label: "Guides" },
    ],
  },
];

// Navbar component
const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // Track which nodes are open/closed
  const [openNodes, setOpenNodes] = useState({});

  // Toggle individual node open/close state
  const toggleNode = (nodeValue) => {
    setOpenNodes((prev) => ({
      ...prev,
      [nodeValue]: !prev[nodeValue],
    }));
  };

  // Recursive tree renderer with chevrons
  const renderTree = (nodes) => (
    <div>
      {nodes.map((node) => (
        <div key={node.value} className="ml-2">
          <div
            className="flex justify-between items-center p-2 cursor-pointer rounded-lg hover:bg-gray-100"
            onClick={() => toggleNode(node.value)}
          >
            <span className="text-sm font-medium">{node.label}</span>
            {node.children ? (
              openNodes[node.value] ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )
            ) : null}
          </div>

          {/* Render children if open */}
          {openNodes[node.value] && node.children && (
            <div className="ml-4 border-l border-gray-300 pl-2">
              {renderTree(node.children)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md w-full">
      {/* Logo */}
      <div className="text-lg font-bold text-gray-800">InfraIndia</div>

      {/* Desktop navigation (hidden on mobile) */}
      <div className="hidden md:flex gap-6 items-center">
        <button className="px-4 py-2 bg-gray-200 rounded">Get started</button>
      </div>

      <div>
        <button className="px-4 py-2 bg-gray-200 rounded">
            <Link to={"/login"}>Login</Link>
        </button>
      </div>

      {/* Mobile menu button (fixed) */}
      <div className="md:hidden">
        <div onClick={open} className="p-2 rounded-md border-none">
          <Burger opened={opened} />
        </div>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer
        opened={opened}
        onClose={close}
        title="InfraIndia"
        position="right"
        classNames={{ body: "p-4" }}
      >
        <div className="flex flex-col gap-4">
          <strong className="text-gray-700">Sections</strong>
          {/* Tree menu */}
          {renderTree(data)}
          <div className="pt-2 mt-2 border-t border-gray-300 text-sm">
            <div className="py-2">
                <Link to={"/login"}>Enterprise</Link>
            </div>
            <div className="py-2">
                <Link to={"/pricing"} >Pricing</Link>
            </div>
            <div className="py-2">
                <Link to={"/careers"}>Careers</Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
