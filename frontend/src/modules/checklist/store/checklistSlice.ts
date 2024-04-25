import { createSlice } from "@reduxjs/toolkit";
import { deleteToken } from "@/common/utils/session";
import { ChecklistApiResponse, ChecklistSubitem } from "../types/checklist";
import {
  createNewChecklistItem,
  createNewSubItem,
  deleteChecklistItem,
  deleteSubItem,
  getChecklistItems,
  getChecklistSubItems,
  updateChecklistItem,
  updateSubItem
} from "./checklistActions";
import { ChecklistFormModalAction } from "../utils/checklistFormModal";

interface UserData {
  loading: boolean,
  items: ChecklistApiResponse,
  success: boolean,
  error?: string,
  type?: ChecklistFormModalAction;
}

const initialState: UserData = {
  loading: false,
  items: [],
  error: undefined,
  success: false,
  type: undefined,
};


export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    logout: () => {
      deleteToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChecklistItems.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(getChecklistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.success = true;
      })
      .addCase(getChecklistItems.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      });

    builder
      .addCase(getChecklistSubItems.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(getChecklistSubItems.fulfilled, (state, action) => {
        const { parentId, data } = action.payload;
        const idx = state.items.findIndex(item => item.id === parentId);
        state.items[idx].subItems = data;
        state.loading = false;
        state.success = true;
      })
      .addCase(getChecklistSubItems.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      });

    builder
      .addCase(createNewChecklistItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(createNewChecklistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.ADD_ITEM;
      })
      .addCase(createNewChecklistItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.ADD_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });
    
    builder
      .addCase(updateChecklistItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(updateChecklistItem.fulfilled, (state, action) => {
        const { id, isToggleCompleted, completed } = action.payload;
        const idx = state.items.findIndex(item => item.id === id);
        state.items[idx] = action.payload;
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.EDIT_ITEM;
        if (isToggleCompleted) {
          const subItems = state.items[idx].subItems;
          if (subItems) {
            const newSubItems: ChecklistSubitem[] = [];
            subItems.forEach(i => {
              newSubItems.push({...i, completed});
            });
            state.items[idx].subItems = newSubItems;
          };
        }
      })
      .addCase(updateChecklistItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.EDIT_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });
    
    builder
      .addCase(deleteChecklistItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(deleteChecklistItem.fulfilled, (state, action) => {
        const { id } = action.payload;
        const items = state.items.filter(item => item.id !== id);
        state.items = items;
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.DELETE_ITEM;
      })
      .addCase(deleteChecklistItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.DELETE_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });
    
    builder
      .addCase(createNewSubItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(createNewSubItem.fulfilled, (state, action) => {
        const { parent_id } = action.payload;
        const idx = state.items.findIndex(item => item.id === parent_id);
        state.items[idx].subitem_count++;
        state.items[idx].subItems?.push(action.payload);
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.ADD_SUB_ITEM;
      })
      .addCase(createNewSubItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.ADD_SUB_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });
    
    builder
      .addCase(updateSubItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(updateSubItem.fulfilled, (state, action) => {
        const { parent_id, id, isToggleCompleted, completed } = action.payload;
        const idx = state.items.findIndex(item => item.id === parent_id);
        const subIdx =  state.items[idx].subItems!.findIndex(item => item.id === id);
        const subItems = state.items[idx].subItems;
        subItems![subIdx] = action.payload;
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.EDIT_SUB_ITEM;
        if (isToggleCompleted) {
          const subItemCount = subItems?.length;
          let completedSubItems = state.items[idx].completed_subitems;
          completed ? completedSubItems++ : completedSubItems--;
          state.items[idx].completed_subitems = completedSubItems;
          state.items[idx].completed = (completedSubItems === subItemCount) ? completed : false;
        }
      })
      .addCase(updateSubItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.EDIT_SUB_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });

    builder
      .addCase(deleteSubItem.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = undefined;
        state.type = undefined;
      })
      .addCase(deleteSubItem.fulfilled, (state, action) => {
        const { id, parent_id } = action.payload;
        const idx = state.items.findIndex(item => item.id === parent_id);
        state.items[idx].subItems = state.items[idx].subItems?.filter((item) => item.id !== id);
        state.loading = false;
        state.success = true;
        state.type = ChecklistFormModalAction.DELETE_SUB_ITEM;
      })
      .addCase(deleteSubItem.rejected, (state, action) => {
        state.loading = false;
        state.type = ChecklistFormModalAction.DELETE_SUB_ITEM;
        // @ts-ignore
        state.error = action.payload.message;
      });
  },
});

export const { } = checklistSlice.actions;

export default checklistSlice.reducer;