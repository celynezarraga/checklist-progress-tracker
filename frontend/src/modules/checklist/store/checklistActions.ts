import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "@/common/utils/urls";
import {
  ChecklistApiGetRequest,
  ChecklistApiGetSubitemsRequest,
  ChecklistCreateApiRequest,
  ChecklistDeleteApiRequest,
  ChecklistSubItemCreateApiRequest,
  ChecklistUpdateApiRequest
} from "../types/checklist";

const CHECKLIST_API = "/api/item";
const SUB_ITEM_API = "/api/subitem";

export const getChecklistItems = createAsyncThunk(
  "checklist/fetchItems",
  async (data: ChecklistApiGetRequest, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}${CHECKLIST_API}`, {
        headers: {
          "Authorization": `Bearer ${data.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const getChecklistSubItems = createAsyncThunk(
  "checklist/fetchSubItems",
  async (data: ChecklistApiGetSubitemsRequest, { rejectWithValue }) => {
    try {
      const { parentId, token } = data;
      const response = await axios.get(`${BACKEND_URL}${CHECKLIST_API}/${parentId}/subitem`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return {
        data: response.data.data,
        parentId
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const createNewChecklistItem = createAsyncThunk(
  "checklist/createItem",
  async (data: ChecklistCreateApiRequest, { rejectWithValue }) => {
    try {
      const { token, title, description } = data;
      const response = await axios.post(
        `${BACKEND_URL}${CHECKLIST_API}`,
        { title, description },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
    ) ;
      return {
        ...response.data.data,
        subitem_count: 0,
        completed_subitems: 0,
        subItems: []
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.message });
    }
  }
);

export const updateChecklistItem = createAsyncThunk(
  "checklist/updateItem",
  async (data: ChecklistUpdateApiRequest, { rejectWithValue }) => {
    try {
      const { token, title, description, completed, id, isToggleCompleted } = data;
      const response = await axios.patch(
        `${BACKEND_URL}${CHECKLIST_API}/${id}`,
        { title, description, completed, id, isToggleCompleted },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
    ) ;
      return {
        ...response.data.data,
        created_by: data.created_by,
        subitem_count: data.subitem_count,
        completed_subitems: isToggleCompleted && completed ? data.completed_subitems : 0,
        subItems: data.subItems,
        isToggleCompleted
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const deleteChecklistItem = createAsyncThunk(
  "checklist/deleteItem",
  async (data: ChecklistDeleteApiRequest, { rejectWithValue }) => {
    try {
      const { token, id } = data;
      const response = await axios.delete(
        `${BACKEND_URL}${CHECKLIST_API}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
      );
      return {
        ...response.data.data
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const createNewSubItem = createAsyncThunk(
  "checklist/createSubItem",
  async (data: ChecklistSubItemCreateApiRequest, { rejectWithValue }) => {
    try {
      const { token, title, description, parent_id } = data;
      const response = await axios.post(
        `${BACKEND_URL}${SUB_ITEM_API}`,
        { title, description, parent_id },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
    ) ;
      return {
        ...response.data.data
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.message });
    }
  }
);

export const updateSubItem = createAsyncThunk(
  "checklist/updateSubItem",
  async (data: ChecklistUpdateApiRequest, { rejectWithValue }) => {
    try {
      const {
        token, title, description, completed,
        id, isToggleCompleted, parent_id
      } = data;
      const response = await axios.patch(
        `${BACKEND_URL}${SUB_ITEM_API}/${id}`,
        { title, description, completed, id, isToggleCompleted, parent_id},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
      );
      return {
        ...response.data.data,
        created_by: data.created_by,
        isToggleCompleted
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const deleteSubItem = createAsyncThunk(
  "checklist/deleteSubItem",
  async (data: ChecklistDeleteApiRequest, { rejectWithValue }) => {
    try {
      const { token, id, parent_id } = data;
      const response = await axios.delete(
        `${BACKEND_URL}${SUB_ITEM_API}/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=UTF-8",
          }
        }
      );
      return {
        ...response.data.data,
        parent_id
      };
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);