import { Router } from "express";
import * as controllers from "../../controllers/users";
// import authMiddleware from "../../middleware/authorization";

const routes = Router();

routes.route("/")
  // .get(authMiddleware, controllers.getAll)
  .post(controllers.signUp);

// routes.route("/:id")
//   .get(authMiddleware, controllers.getOne)
//   .patch(authMiddleware, controllers.updateOne)
//   .delete(authMiddleware, controllers.deleteOne);

routes.route("/login")
  .post(controllers.authenticate);

routes.route("/verify")
  .post(controllers.verify);

export default routes;