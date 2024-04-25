import { NextFunction, Request, Response } from "express";
import ChecklistModel from "../models/checklist";
import SubChecklistModel from "../models/subChecklist";
import { getUserId } from "../middleware/authorization";
import { Checklist } from "../types/checklist";

const checklistModel = new ChecklistModel();
const subChecklistModel = new SubChecklistModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const checklist = await checklistModel.create({
      ...req.body,
      created_by: userId,
      created_at: new Date(),
    });
    res.json({
      data: { ...checklist },
      status: "success",
      message: "Checklist successfully created."
    });
  } catch (err) {
    next(err);
  }
};

export const getSubItemsDetails = async (item: Checklist): Promise<Checklist> => {
  const results = await checklistModel.getSubItemCount(item.id!);
  return {
    ...item,
    ...results
  };
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const items = await checklistModel.getAll(userId);
    const checklistItems = await Promise.all(items.map(getSubItemsDetails));
    res.json({
      data: checklistItems,
      status: "success",
      message: "Checklist items retrieved successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const itemId = req.body.id;
    const isCompleted = req.body.completed;
    const isToggleCompleted = req.body.isToggleCompleted;

    const checklist = await checklistModel.updateOne(userId, req.body);

    if (isToggleCompleted) {
      await subChecklistModel.toggleCompletedByParent(userId, itemId, isCompleted);
    }

    res.json({
      data: checklist,
      status: "success",
      message: "Checklist item updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const id = req.params.id;
    await subChecklistModel.deleteByParent(userId, id);
    const checklist = await checklistModel.deleteOne(userId, id);
    res.json({
      data: {
        ...checklist,
        id: req.params.id
      },
      status: "success",
      message: "Checklist item deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};