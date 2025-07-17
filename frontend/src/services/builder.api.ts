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

export const callGemini = async (
  inputText: string,
  selectedHtml: string
): Promise<{ action: string; payload: any }> => {
  try {
    console.log(inputText, selectedHtml);

    const response = await api.post("/generate", {
      inputText,
      selectedHtml,
    });

    return response.data;
  } catch (err) {
    console.error("API call to backend failed:", err);
    return { action: "unknown", payload: {} };
  }
};

export const generateWebsite = async ({
  websiteType,
  theme,
  language,
  requirements,
}: {
  websiteType: string;
  theme: string;
  language: string;
  requirements: string;
}) => {
  try {
    const res = await api.post("/generate/website", {
      websiteType,
      theme,
      language,
      requirements,
    });

    return res.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
