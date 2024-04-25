import { NextFunction, Request, Response } from "express";
import ChecklistModel from "../models/checklist";
import SubChecklistModel from "../models/subChecklist";
import { getUserId } from "../middleware/authorization";
import { getSubItemsDetails } from "./checklist";

const checklistModel = new ChecklistModel();
const subChecklistModel = new SubChecklistModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const checklist = await subChecklistModel.create({
      ...req.body,
      created_by: userId,
      created_at: new Date(),
    });
    res.json({
      data: { ...checklist },
      status: "success",
      message: "Checklist subitem successfully created."
    });
  } catch (err) {
    next(err);
  }
};

export const getAllByParent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const parentId = req.params.parentId;
    const checklistItems = await subChecklistModel.getAllByParent(userId, parentId);
    res.json({
      data: checklistItems,
      status: "success",
      message: "Checklist subitems retrieved successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const isCompleted = req.body.completed;
    const isToggleCompleted = req.body.isToggleCompleted;
    const parentId = req.body.parent_id;
    
    const checklistSubItem = await subChecklistModel.updateOne(userId, req.body);

    if (isToggleCompleted) {
      const checklist = await checklistModel.getOne(userId, parentId);
      const counter = await getSubItemsDetails(checklist);
      const checklistIsCompleted = checklist.completed;

      if (counter.completed_subitems === counter.subitem_count) {
        await checklistModel.toggleCompleted(userId, parentId, isCompleted);
      } else {
        if (checklistIsCompleted) {
          await checklistModel.toggleCompleted(userId, parentId, false);
        }
      }
    }

    res.json({
      data: checklistSubItem,
      status: "success",
      message: "Checklist subitem updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const paramsId = req.params.id;
    const checklist = await subChecklistModel.deleteOne(userId, paramsId);
    res.json({
      data: {
        ...checklist,
        id: paramsId,
      },
      status: "success",
      message: "Checklist subitem deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};