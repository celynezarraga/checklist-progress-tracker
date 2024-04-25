import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import config from "../config";

const userModel = new UserModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      data: { ...user },
      status: "success",
      message: "User created successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getAll();
    res.json({
      data: users,
      status: "success",
      message: "Users retrieved successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      data: user,
      status: "success",
      message: "User retrieved successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      data: user,
      status: "success",
      message: "User updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      data: user,
      status: "success",
      message: "User deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials."
      });
    }

    const token = jwt.sign({ user }, config.TOKEN as unknown as string);

    res.json({
      data: { ...user, token },
      status: "success",
      message: "User authenticated successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body);
    const token = await jwt.sign({ user }, config.TOKEN as unknown as string);
    res.json({
      data: { ...user, token },
      status: "success",
      message: "User signed up successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const user = await userModel.verify(token, config.TOKEN as unknown as string);
    res.json({
      data: { ...user, token },
      status: "success",
      message: "User verified successfully."
    });
  } catch (err) {
    next(err);
  }
};