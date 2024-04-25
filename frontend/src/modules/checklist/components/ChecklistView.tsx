import React, { FC } from "react";
import ChecklistItem from "./ChecklistItem";
import { Accordion, Box, Flex, Spinner } from "@chakra-ui/react";
import {
  CHECKLIST_TYPE,
  Checklist,
  ChecklistFormData,
  ItemViewType
} from "../types/checklist";
import ChecklistFormModal from "./modal/ChecklistFormModal";
import { MODAL_DATA } from "../utils/checklistFormModal";

interface ChecklistViewProps {
  loading: boolean;
  items: Checklist[];
  createItem: (type: CHECKLIST_TYPE, formData: ChecklistFormData) => void;
  updateItem: (type: CHECKLIST_TYPE, formData: ItemViewType, isToggleCompleted?: boolean) => void;
  deleteItem: (type: CHECKLIST_TYPE, id: string, parent_id?: string) => void;
}

const ChecklistView: FC<ChecklistViewProps> = ({
  loading,
  items,
  createItem,
  updateItem,
  deleteItem
}) => {

  return (
    <Accordion allowMultiple>
      <Flex>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="sm"
          textTransform="uppercase"
          ml="2"
          mb="2"
          flex="1"
        >
          Checklist
        </Box>
        <ChecklistFormModal
          modalData={MODAL_DATA.ADD_ITEM}
          handleSubmit={
            (formData: ChecklistFormData) => {
              createItem(CHECKLIST_TYPE.MAIN, formData);
            }
          }
        />
      </Flex>
      {
        items.map((item, index) => {
          return (
            <ChecklistItem
              loading={loading}
              key={index}
              item={item}
              createItem={createItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          );
        })
      }
    </Accordion>
  );
};

export default ChecklistView;