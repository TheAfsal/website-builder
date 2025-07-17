const getOrCreateProjectId = (): string => {
  let projectId = sessionStorage.getItem("PROJECT_ID");
  if (!projectId) {
    projectId = crypto.randomUUID(); // or use uuid.v4() if using uuid package
    sessionStorage.setItem("PROJECT_ID", projectId);
  }
  return projectId;
};

export default getOrCreateProjectId
