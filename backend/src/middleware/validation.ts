import { NextFunction, Request, Response } from "express";
import Error from "../interfaces/error";

import { getUserId, handleUnauthorizedAccess } from "./authorization";

export const handleBadRequest = (next: NextFunction) => {
  const error: Error = new Error("Bad Request.");
  error.status = 404;
  next(error);
};

const validationMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    if (!userId || userId === "" || (req.params.userId && req.params.userId !== userId)) {
      handleUnauthorizedAccess(next);
    } else if (req.method === "POST" && req.params.id && (req.params.id !== req.body.id)) {
      handleBadRequest(next);
    } else if (req.method === "POST" && !req.body.title) {
      handleBadRequest(next);
    } else if (req.method === "PATCH" && !req.body.title) {
      handleBadRequest(next);
    } else {
      next();
    }
  } catch (err) {
    handleUnauthorizedAccess(next);
  }
};

export default validationMiddleware;