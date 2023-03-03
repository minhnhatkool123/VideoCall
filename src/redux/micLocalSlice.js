import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const micLocalSlice = createSlice({
  name: 'micLocal',
  initialState,
  reducers: {
    startMicrophone: (state, action) => {
      state.value = action.payload;
    },
    resetMicrophone: state => {
      state.value = true;
    },
  },
});

export const {startMicrophone, resetMicrophone} = micLocalSlice.actions;

export default micLocalSlice.reducer;
