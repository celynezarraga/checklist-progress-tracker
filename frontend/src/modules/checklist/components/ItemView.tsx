import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useState
} from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox
} from "@chakra-ui/react";
import {
  CHECKLIST_TYPE,
  ChecklistFormData,
  ItemViewType
} from "../types/checklist";
import ChecklistFormModal from "./modal/ChecklistFormModal";
import ChecklistDeleteConfirmationModal from "./modal/ChecklistDeleteConfirmationModal";
import { MODAL_DATA } from "../utils/checklistFormModal";

interface ItemViewProps {
  type: CHECKLIST_TYPE;
  key: number;
  item: ItemViewType;
  toggleCompleted: () => void;
  fetchSubData?: (id: string) => void;
  handleCreate: (type: CHECKLIST_TYPE, formData: ChecklistFormData) => void;
  handleUpdate: (type: CHECKLIST_TYPE, formData: ChecklistFormData) => void;
  handleDelete: (type: CHECKLIST_TYPE, id: string, parent_id?: string) => void;
  children?: ReactNode;
};

const ItemView: FC<ItemViewProps> = ({
  type, key, item, children,
  toggleCompleted, fetchSubData, handleCreate,
  handleUpdate, handleDelete
}) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMainTask, _setIsMainTask] = useState<boolean>(type === CHECKLIST_TYPE.MAIN);

  const { 
    id, title, description, completed,
    subitem_count:subItemCount,
    completed_subitems: completedSubItems,
  } = item;

  useEffect(() => {
    if (isExpanded && fetchSubData) {
      fetchSubData(id!);
    }
  }, [isExpanded, fetchSubData, id]);

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleCompleted = (e: ChangeEvent) => {
    e.stopPropagation();
    toggleCompleted();
  };

  const handleAddSub = (formData: ChecklistFormData) => {
    handleCreate(CHECKLIST_TYPE.SUB, {
      ...formData,
      parent_id: id,
    });
  };

  const handleEdit = (formData: ChecklistFormData) => {
    handleUpdate(type, formData);
  };

  const onDelete = () => {
    if (isMainTask) {
      handleDelete(type, id!);
    } else {
      handleDelete(type, id!, item.parent_id);
    }
  };

  return (
    <AccordionItem key={key}>
      <h2>
        <AccordionButton
          _expanded={
            {
              bg: isMainTask ?
                "#008080"
                : "#1E9C99",
              color: "white"
            }
          }
          backgroundColor={"white"}
          onClick={handleToggleExpanded}
        >
          {isExpanded ? (
            <TriangleUpIcon mr={2} fontSize="12px" />
          ) : (
            <TriangleDownIcon mr={2} fontSize="12px" />
          )}
          <Checkbox
            marginRight={2}
            size="md"
            colorScheme={isExpanded ? "white" : "teal"}
            isChecked={completed}
            onChange={handleToggleCompleted}
          />
          <Box
            mr={2}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            { title }
          </Box>
          <>
            {
              isMainTask
              ? <Box
                  as="span"
                  color={isExpanded ? "white" : "gray.600"}
                  fontSize="sm"
                >
                  { `${subItemCount! > 0 ? `(${completedSubItems}/${subItemCount})` : ""}` }
                </Box>
              : null
            }
          </>
          <Box flex={1}/>
          { isMainTask
            ? <ChecklistFormModal
              modalData={MODAL_DATA.ADD_SUB_ITEM}
              handleSubmit={handleAddSub}
            />
            : null
          }
          <ChecklistFormModal
            modalData={
              isMainTask
                ? MODAL_DATA.EDIT_ITEM
                : MODAL_DATA.EDIT_SUB_ITEM
            }
            handleSubmit={handleEdit}
            initialValues={item}
          />
          <ChecklistDeleteConfirmationModal
            modalData={
              isMainTask
                ? MODAL_DATA.DELETE_ITEM
                : MODAL_DATA.DELETE_SUB_ITEM
            }
            handleSubmit={onDelete}
            itemTitle={item.title}
          />
        </AccordionButton>
      </h2>
      <AccordionPanel bgColor={"#DAECEC"}>
        <Box
          mx={3}
          pb={4}
          as="span"
          flex="1"
          textAlign="left"
          fontSize="sm"
          fontStyle="italic"
        >
          { `${description ? description : "No description provided."}` }
        </Box>
        {
          isMainTask && children &&
          <Box mt={2} mx={3}> { children } </Box>
        }
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ItemView;