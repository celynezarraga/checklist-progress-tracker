import { Router } from "express";
import userRoutes from "./api/users";
import checklistRoutes from "./api/checklist";
import subChecklistRoutes from "./api/subChecklist";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/item", checklistRoutes);
routes.use("/subitem", subChecklistRoutes);

export default routes;