import api from "../axios";
// Get all projects
export const getProjects = async (token) => {
  try {
    const response = await api.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.message);
  }
};
// delete project
export const deleteProject = async (id, token) => {
  try {
    const response = await api.delete(`projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.message);
  }
};
