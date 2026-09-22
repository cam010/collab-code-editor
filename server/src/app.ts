import express from "express";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/workspaces", workspaceRoutes);

export default app;
