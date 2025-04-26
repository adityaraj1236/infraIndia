// services/projectService.js
import axios from "axios";

export const getMyOrganizationProjects = async (token) => {
  const response = await axios.get("/api/projects/my-organization-projects", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
