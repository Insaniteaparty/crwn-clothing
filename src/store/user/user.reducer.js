import { createSlice } from "@reduxjs/toolkit";

export const USER_INITIAL_STATE = {
  currentUser: null,
};

/** the actions are actually created by this slice (previously userReducer).
 * we also do not need the types anymore!
 */
const userSlice = createSlice({
  name: "user", // namespace for the actions
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      /** even if it looks like we're mutating the state,
       * actually under the hood rtk is creating a new object (immer) to pass to the state
       */
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
