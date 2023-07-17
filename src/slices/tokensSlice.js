import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokens: [],
};

export const selectStatus = (state) => state.tokens.status;

export const tokensSlice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
        fillTokens: (state, action) => {
            state.tokens = [...action.payload];
        },
    },
});

export const { fillTokens } = tokensSlice.actions;

export default tokensSlice.reducer;
