import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/api";

export const fetchTokens = createAsyncThunk("tokens/fetch", async (thunkApi) => {
  const response = await fetch(`${baseUrl}`);
  const data = await response.json();
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Fail to load tokens",
    });
  }

  return data;
});
