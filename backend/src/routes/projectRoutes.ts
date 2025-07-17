import express from "express";
import * as projectController from "../controllers/projectController.ts";

const router = express.Router();

router.post("/:projectId", projectController.saveProject);
router.get("/:projectId", projectController.loadProject);
router.get("/", projectController.listProjects);

export default router;
