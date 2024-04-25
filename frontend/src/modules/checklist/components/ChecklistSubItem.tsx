import React, { FC } from "react";
import ItemView from "./ItemView";
import {
  CHECKLIST_TYPE,
  ChecklistFormData,
  ChecklistSubitem as ChecklistSubitemType,
  ItemViewType
} from "../types/checklist";

interface ChecklistSubItemProps {
  key: number;
  item: ChecklistSubitemType;
  handleCreate: (
    type: CHECKLIST_TYPE,
    formData: ChecklistFormData
  ) => void;
  handleUpdate: (type: CHECKLIST_TYPE, formData: ItemViewType, isToggleCompleted?: boolean) => void;
  handleDelete: (type: CHECKLIST_TYPE, id: string, parent_id?: string) => void;
}

const ChecklistSubItem: FC<ChecklistSubItemProps> = ({
  key, item, handleCreate, handleUpdate, handleDelete
}) => {

  const handleToggleCompleted = () => {
    handleUpdate(CHECKLIST_TYPE.SUB, {...item, completed: !item.completed}, true);
  };

  const handleUpdateSubItem = (type: CHECKLIST_TYPE, formData: ChecklistFormData) => {
    handleUpdate(type, {...item, ...formData});
  };

  return (
    <ItemView
      type={CHECKLIST_TYPE.SUB}
      key={key}
      item={item}
      toggleCompleted={handleToggleCompleted}
      handleCreate={handleCreate}
      handleUpdate={handleUpdateSubItem}
      handleDelete={handleDelete}
    />
  );
};

export default ChecklistSubItem;