import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Error from "../interface/error";
import config from "../config";

export const handleUnauthorizedAccess = (next: NextFunction) => {
  const error: Error = new Error("Unauthorized.");
  error.status = 401;
  next(error);
};

export const getUserId = (req: Request): string => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const authHeaderContents = authHeader.split(" ");
    const bearer = authHeaderContents[0].toLowerCase();
    const token = authHeaderContents[1];
    if (token && bearer === "bearer") {
      const isValid = jwt.verify(token, config.TOKEN as unknown as string);
      if (isValid) {
        const decode = jwt.decode(token, {json: true});
        return decode ? decode.user.id : "";
      }
    }
  }
  return "";
};

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const authHeaderContents = authHeader.split(" ");
      const bearer = authHeaderContents[0].toLowerCase();
      const token = authHeaderContents[1];
      if (token && bearer === "bearer") {
        const isValid = jwt.verify(token, config.TOKEN as unknown as string);
        if (isValid) {
          next();
        } else {
          handleUnauthorizedAccess(next);
        }
      } else {
        handleUnauthorizedAccess(next);
      }
    } else {
      handleUnauthorizedAccess(next);
    }
  } catch (err) {
    handleUnauthorizedAccess(next);
  }
};

export default authMiddleware;