import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRegisterRequest, UserLoginRequest } from "../types/user";
import { BACKEND_URL } from "@/common/utils/urls";

const USER_API = "/api/user";

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: UserRegisterRequest, { rejectWithValue }) => {
    try {
      const { firstName, lastName, email, password } = data;
      const response = await axios.post(`${BACKEND_URL}${USER_API}`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });
      return response.data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: UserLoginRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}${USER_API}/login`, data);
      return response.data.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue({ message: error.response.data.message });
    }
  }
);