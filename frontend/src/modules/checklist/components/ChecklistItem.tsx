import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import {
  CHECKLIST_TYPE,
  Checklist,
  ChecklistFormData,
  ItemViewType
} from "../types/checklist";
import ItemView from "./ItemView";
import ChecklistSubItem from "./ChecklistSubItem";
import { AppDispatch, RootState } from "@/store/store";
import { getChecklistSubItems } from "../store/checklistActions";

interface ChecklistItemProps {
  key: number;
  item: Checklist;
  loading: boolean;
  createItem: (type: CHECKLIST_TYPE, formData: ItemViewType) => void;
  updateItem: (type: CHECKLIST_TYPE, formData: ItemViewType, isToggleCompleted?: boolean) => void;
  deleteItem: (type: CHECKLIST_TYPE, id: string, parent_id?: string) => void;
}

const ChecklistItem: FC<ChecklistItemProps> = ({
  key,
  item,
  createItem,
  updateItem,
  deleteItem,
  loading
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading: userLoading, token } = useSelector(
    (state: RootState) => state.user
  );

  const subItemCount = item.subitem_count;
  const subItems = item.subItems;

  const handleFetchSubitems = () => {
    if (!userLoading && token && subItemCount > 0 && !subItems) {
      dispatch(getChecklistSubItems({token, parentId: item.id}));
    }
  };

  const handleToggleCompleted = () => {
    updateItem(CHECKLIST_TYPE.MAIN, {...item, completed: !item.completed}, true);
  };

  const handleUpdateItem = (type: CHECKLIST_TYPE, formData: ChecklistFormData, isToggleCompleted?: boolean) => {
    updateItem(type, { ...item, ...formData}, isToggleCompleted);
  };

  return (
    <ItemView
      type={CHECKLIST_TYPE.MAIN}
      key={key}
      item={item}
      toggleCompleted={handleToggleCompleted}
      fetchSubData={handleFetchSubitems}
      handleCreate={createItem}
      handleUpdate={handleUpdateItem}
      handleDelete={deleteItem}
    >
      {
        subItemCount > 0 && 
        <>
        {
          loading && subItemCount > 0 && !subItems &&
          <Spinner />
        }
        {
          subItems?.map((subitem, index) => {
            return (
              <ChecklistSubItem
                key={index}
                item={subitem}
                handleCreate={createItem}
                handleUpdate={handleUpdateItem}
                handleDelete={deleteItem}
              />
            );
          })
        }
        </>
      }
    </ItemView>
  );
};

export default ChecklistItem;