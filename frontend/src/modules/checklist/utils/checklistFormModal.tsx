import { ReactNode } from "react";
import { AddIcon, DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";

export type ChecklistFormModalDataType = {
  actionType: ChecklistFormModalAction;
  icon: ReactNode;
  iconTooltip: string;
  header: string;
  buttonText: string;
  successToastMessage: string;
  errorToastMessage: string;
}

export enum ChecklistFormModalAction {
  ADD_ITEM = "ADD_ITEM",
  EDIT_ITEM = "EDIT_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  ADD_SUB_ITEM = "ADD_SUB_ITEM",
  EDIT_SUB_ITEM = "EDIT_SUB_ITEM",
  DELETE_SUB_ITEM = "DELETE_SUB_ITEM"
}

export const MODAL_DATA = {
  ADD_ITEM: {
    actionType: ChecklistFormModalAction.ADD_ITEM,
    icon: <AddIcon mx={1} fontSize='12px'/>,
    iconTooltip:  "Create new task",
    header: "Create new item",
    buttonText: "Create",
    successToastMessage: "New task succesfully created.",
    errorToastMessage: "Error creating new task.",
  },
  EDIT_ITEM: {
    actionType: ChecklistFormModalAction.EDIT_ITEM,
    icon: <EditIcon mx={1} fontSize='15px'/>,
    iconTooltip:  "Update task",
    header: "Update item",
    buttonText: "Update",
    successToastMessage: "Task succesfully updated.",
    errorToastMessage: "Error updating task.",
  },
  DELETE_ITEM: {
    actionType: ChecklistFormModalAction.DELETE_ITEM,
    icon: <DeleteIcon mx={1} fontSize='15px'/>,
    iconTooltip:  "Delete item",
    header: "Delete item",
    buttonText: "Delete",
    successToastMessage: "Task succesfully deleted.",
    errorToastMessage: "Error deleting task.",
  },
  ADD_SUB_ITEM: {
    actionType: ChecklistFormModalAction.ADD_SUB_ITEM,
    icon: <PlusSquareIcon mx={1} fontSize='15px'/>,
    iconTooltip:  "Add subtask",
    header: "Add new subtask",
    buttonText: "Add",
    successToastMessage: "Subtask succesfully added.",
    errorToastMessage: "Error adding new subtask.",
  },
  EDIT_SUB_ITEM: {
    actionType: ChecklistFormModalAction.EDIT_SUB_ITEM,
    icon: <EditIcon mx={1} fontSize='15px'/>,
    iconTooltip:  "Update subtask",
    header: "Update subtask",
    buttonText: "Update",
    successToastMessage: "Subtask succesfully updated.",
    errorToastMessage: "Error updating subtask.",
  },
  DELETE_SUB_ITEM: {
    actionType: ChecklistFormModalAction.DELETE_SUB_ITEM,
    icon: <DeleteIcon mx={1} fontSize='15px'/>,
    iconTooltip:  "Delete subtask",
    header: "Delete subtask",
    buttonText: "Delete",
    successToastMessage: "Subtask succesfully deleted.",
    errorToastMessage: "Error deleting subtask.",
  }
};
