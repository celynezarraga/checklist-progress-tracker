import { Router } from "express";
import * as controllers from "../../controllers/subChecklist";
import validationMiddleware from "../../middleware/validation";

const routes = Router();

routes.route("/")
  .post(validationMiddleware, controllers.create);

routes.route("/:id")
  .patch(validationMiddleware, controllers.updateOne)
  .delete(validationMiddleware, controllers.deleteOne);

export default routes;