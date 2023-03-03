import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const pinSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    setPin: (state, action) => {
      state.value = action.payload;
    },
    resetPin: state => {
      state.value = false;
    },
  },
});

export const {setPin, resetPin} = pinSlice.actions;

export default pinSlice.reducer;
