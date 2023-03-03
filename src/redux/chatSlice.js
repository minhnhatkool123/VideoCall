import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  chat: [],
  counter: 0,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action) => {
      //state.remoteUsers.push(action.payload);
      state.chat.unshift(action.payload);
    },
    countChat: state => {
      state.counter += 1;
    },
    resetCounterChat: state => {
      state.counter = 0;
    },
    resetChat: state => {
      const newChat = [];
      state.chat = newChat;
    },
  },
});

export const {addChat, resetChat, countChat, resetCounterChat} =
  chatSlice.actions;

export default chatSlice.reducer;
