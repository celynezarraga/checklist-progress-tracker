import { Router } from "express";
import * as controllers from "../../controllers/checklist";
import * as subChecklistControllers from "../../controllers/subChecklist";
import authMiddleware from "../../middleware/authorization";
import validationMiddleware from "../../middleware/validation";

const routes = Router();

routes.route("/")
  .get(authMiddleware, controllers.getAll)
  .post(authMiddleware, controllers.create);

routes.route("/:parentId/subitem")
  .get(validationMiddleware, subChecklistControllers.getAllByParent);

routes.route("/:id")
  .patch(validationMiddleware, controllers.updateOne)
  .delete(validationMiddleware, controllers.deleteOne);

export default routes;