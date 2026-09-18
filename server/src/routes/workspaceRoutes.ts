import { Router } from "express"
import { getAllWorkspaces } from "../controllers/workspaceController.js"

const router = Router()

router.get("/", getAllWorkspaces)

export default router
