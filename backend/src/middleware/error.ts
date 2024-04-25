import { NextFunction, Request, Response } from "express";
import Error from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const status = error.status ?? 500;
  const message = error.message ?? "Internal Server Error";
  res.status(status).json({status, message});
};

export default errorMiddleware;