import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  Message: [],
  Binlist: []
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
    },
    DeleteMessage(state, action) {
      const Id = action.payload;
      const messageToDelete = state.Message.find(msg => msg.id === Id);
      if (messageToDelete) {
        state.Message = state.Message.filter(msg => msg.id !== Id);
        state.Binlist.push(messageToDelete);
      }
    }
  }
});

export const Mailaction = MailSlice.actions;
export default MailSlice;
