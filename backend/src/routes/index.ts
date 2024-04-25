import { Router } from "express";
import usersRoutes from "./api/users";

const routes = Router();

routes.use("/user", usersRoutes);

export default routes;