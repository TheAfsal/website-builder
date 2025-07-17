import type { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import type { AuthRequest } from '../types/index.ts';

export const saveProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { data } = req.body;
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await projectService.saveProject(projectId, userId, data);
    res.status(200).json({ message: 'Project saved' });
  } catch (error) {
    console.error('Save project error:', error);
    res.status(500).json({ message: 'Failed to save project' });
  }
};

export const loadProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const project = await projectService.loadProject(projectId, userId);
    res.status(200).json(project ? project.data : null);
  } catch (error) {
    console.error('Load project error:', error);
    res.status(500).json({ message: 'Failed to load project' });
  }
};

export const listProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const projects = await projectService.listProjects(userId);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};