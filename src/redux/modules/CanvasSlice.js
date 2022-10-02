import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgUrl: '',
};

export const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        addImgUrl: (state, action) => {
            state.imgUrl = action.payload;
        }
    },
});

export const { addImgUrl } = canvasSlice.actions;
export default canvasSlice.reducer;