import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { Message: [] };

const MailSlice = createSlice({
  name: 'Mail',
  initialState: initialMailState,
  reducers: {
    Message(state, action) {
      state.Message = action.payload;
    }
  }
});

export const Mailaction = MailSlice.actions;
export default MailSlice;
