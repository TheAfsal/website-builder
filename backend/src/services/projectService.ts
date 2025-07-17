import Project from '../models/project';
import mongoose from 'mongoose';

export const saveProject = async (projectId: string, userId: string, data: object) => {
  await Project.findOneAndUpdate(
    { projectId, userId: new mongoose.Types.ObjectId(userId) },
    { projectId, userId: new mongoose.Types.ObjectId(userId), data },
    { upsert: true }
  );
};

export const loadProject = async (projectId: string, userId: string) => {
  const project = await Project.findOne({
    projectId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  return project;
};

export const listProjects = async (userId: string) => {
  const projects = await Project.find({ userId: new mongoose.Types.ObjectId(userId) });
  return projects;
};