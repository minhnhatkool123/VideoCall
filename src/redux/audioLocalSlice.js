import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const audioLocalSlice = createSlice({
  name: 'audioLocal',
  initialState,
  reducers: {
    hasSound: (state, action) => {
      state.value = action.payload;
    },
    resetSound: state => {
      state.value = 0;
    },
  },
});

export const {hasSound, resetSound} = audioLocalSlice.actions;

export default audioLocalSlice.reducer;
