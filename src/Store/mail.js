import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  Message: [],
};

const MailSlice = createSlice({
  name: 'mail',
  initialState: initialMailState,
  reducers: {
    setMessage(state, action) {
      state.Message = action.payload;
    },
    markAsRead(state, action) {
      const messageId = action.payload;
      const message = state.Message.find(msg => msg.id === messageId);
      if (message) {
        message.isRead = true;
      }
    }
  }
});

export const Mailaction = MailSlice.actions;
export default MailSlice;
