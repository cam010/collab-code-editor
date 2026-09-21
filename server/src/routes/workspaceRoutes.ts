import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspacesController,
  getWorkspaceByIdController,
} from "../controllers/workspaceController.js";
import {
  createFileController,
  getFileByIdController,
  getFilesByWorkspaceIdController,
  updateFileController,
} from "../controllers/fileController.js";

const router = Router();

router.get("/", getAllWorkspacesController);
router.post("/", createWorkspaceController);

router.get("/:workspaceId", getWorkspaceByIdController);
router.get("/:workspaceId/files", getFilesByWorkspaceIdController);
router.post("/:workspaceId/files", createFileController);
router.get("/:workspaceId/files/:fileId", getFileByIdController);
router.patch("/:workspaceId/files/:fileId", updateFileController)

export default router;
