import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INIT_STATE = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INIT_STATE,
  reducers: {
    setCategoriesMap(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategoriesMap } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
