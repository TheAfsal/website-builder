import api from "./axiosInstance";

export const saveProject = async (projectId: string, project: object) => {
  try {
    const response = await api.post(`/projects/${projectId}`, {
      data: project,
    });
    return response.data;
  } catch (error) {
    console.error("Save project error:", error);
    throw error;
  }
};

export const loadProject = async (projectId: string) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Load project error:", error);
    return null;
  }
};

export const getMyProjects = async () => {
  try {
    const response = await api.get(`/projects`);
    return response.data;
  } catch (err) {
    console.error("Fetch my projects failed:", err);
    return [];
  }
};
