import { Router } from "express"
import { createWorkspaceController, getAllWorkspacesController, getWorkspaceByIdController } from "../controllers/workspaceController.js"
import { getFilesByWorkspaceIdController } from "../controllers/fileController.js"

const router = Router()

router.get("/", getAllWorkspacesController)
router.post("/", createWorkspaceController)

router.get("/:workspaceId", getWorkspaceByIdController)
router.get("/:workspaceId/files", getFilesByWorkspaceIdController)

export default router
