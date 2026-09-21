import { Router } from "express"
import { createWorkspaceController, getAllWorkspacesController, getWorkspaceByIdController } from "../controllers/workspaceController.js"

const router = Router()

router.get("/", getAllWorkspacesController)
router.post("/", createWorkspaceController)
router.get("/:workspaceId", getWorkspaceByIdController)

export default router
