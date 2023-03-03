import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const callMemberListSlice = createSlice({
  name: 'callMemberList',
  initialState,
  reducers: {
    callMemberListVisible: (state, action) => {
      state.value = action.payload;
    },
    resetCallMemberListVisible: state => {
      state.value = false;
    },
  },
});

export const {callMemberListVisible, resetCallMemberListVisible} =
  callMemberListSlice.actions;

export default callMemberListSlice.reducer;
