import { useDispatch, useSelector } from "react-redux";
import ProgressTracker from "./components/ProgressTracker";
import ChecklistView from "./components/ChecklistView";
import { useEffect, useState } from "react";
import {
  createNewChecklistItem,
  createNewSubItem,
  deleteChecklistItem,
  deleteSubItem,
  getChecklistItems,
  updateChecklistItem,
  updateSubItem
} from "./store/checklistActions";
import { AppDispatch, RootState } from "@/store/store";
import { CHECKLIST_TYPE, ChecklistFormData, Checklist as ChecklistType, ItemViewType } from "./types/checklist";
import { Box, Card } from "@chakra-ui/react";

const Checklist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, items, success, error } = useSelector(
    (state: RootState) => state.checklist
  );
  const { loading: userLoading, token } = useSelector(
    (state: RootState) => state.user
  );

  const [progress, setProgress] = useState<number>(0);
  const [calculatingProgress, setCalculatingProgress] = useState<boolean>(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && !userLoading) {
      dispatch(getChecklistItems({ token }));
    }
  }, [dispatch, token, userLoading]);

  useEffect(() => {
    if (!loading) {
      setCalculatingProgress(true);
      setChecklistItems(items);
    }
  }, [items, loading]);

  useEffect(() => {
    setIsLoading(loading || userLoading || !token);
  }, [loading, userLoading])

  useEffect(() => {
    const calculate = () => {
      const totalItems = checklistItems.length;
      let currrentProgress = 0;
      checklistItems.forEach((item) => {
        if (item.completed || (item.completed_subitems > 0 && item.completed_subitems === item.subitem_count)) {
          currrentProgress++;
        } else if (item.completed_subitems > 0) {
          currrentProgress += (item.completed_subitems / item.subitem_count);
        }
      });
      setProgress(Number(((currrentProgress / totalItems) * 100).toFixed(2)));
      setCalculatingProgress(false);
    };

    calculate();
  }, [checklistItems]);

  const handleCreateNewItem = (type: CHECKLIST_TYPE, formData: ChecklistFormData) => {
    if (token && !userLoading) {
      switch (type) {
        case CHECKLIST_TYPE.MAIN:
          dispatch(createNewChecklistItem({...formData, token}));
          break;
        case CHECKLIST_TYPE.SUB:
          dispatch(createNewSubItem({
            ...formData,
            parent_id: formData.parent_id!,
            token
          }));
          break;
        default:
          break;
      }
    }
  };

  const handleUpdateItem = (type: CHECKLIST_TYPE, formData: ItemViewType, isToggleCompleted?: boolean) => {
    if (token && !userLoading) {
      switch (type) {
        case CHECKLIST_TYPE.MAIN:
          dispatch(updateChecklistItem({...formData, token, isToggleCompleted}));
          break;
        case CHECKLIST_TYPE.SUB:
          dispatch(updateSubItem({
            ...formData,
            token,
            parent_id: formData.parent_id!,
            isToggleCompleted
          }));
          break;
        default:
          break;
      }
    }
  };

  const handleDeleteItem = (type: CHECKLIST_TYPE, id: string, parent_id?: string) => {
    if (token && !userLoading) {
      switch (type) {
        case CHECKLIST_TYPE.MAIN:
          dispatch(deleteChecklistItem({token, id}));
          break;
        case CHECKLIST_TYPE.SUB:
          dispatch(deleteSubItem({
            token,
            id,
            parent_id: parent_id!,
          }));
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <Card margin={5} padding={5} variant={"elevated"}>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='lg'
          m='2'
        >
          My Travel Checklist
        </Box>
        {
          items.length > 0
          ? <Box m='2'>
            <ProgressTracker loading={calculatingProgress} value={progress}/>
          </Box>
          : null
        }
      </Card>
      <Card margin={5} padding={5} variant={"elevated"}>
        <ChecklistView
          loading={isLoading}
          items={checklistItems}
          createItem={handleCreateNewItem}
          updateItem={handleUpdateItem}
          deleteItem={handleDeleteItem}
        />
      </Card>
    </div>
  );
};

export default Checklist;