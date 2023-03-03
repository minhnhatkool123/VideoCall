import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const joinRoomLocalSlice = createSlice({
  name: 'joinRoomLocal',
  initialState,
  reducers: {
    startJoinRoom: (state, action) => {
      state.value = action.payload;
    },
    resetJoinRoom: state => {
      state.value = false;
    },
  },
});

export const {startJoinRoom, resetJoinRoom} = joinRoomLocalSlice.actions;

export default joinRoomLocalSlice.reducer;
