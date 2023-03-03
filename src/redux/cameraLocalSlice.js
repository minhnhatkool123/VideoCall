import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: true,
  flipCamera: true,
};

export const cameraLocalSlice = createSlice({
  name: 'cameraLocal',
  initialState,
  reducers: {
    startCamera: (state, action) => {
      state.value = action.payload;
    },
    flipCamera: (state, action) => {
      state.flipCamera = action.payload;
    },
    resetCamera: state => {
      state.value = true;
    },
    resetFlipCamera: state => {
      state.flipCamera = true;
    },
  },
});

export const {startCamera, flipCamera, resetCamera, resetFlipCamera} =
  cameraLocalSlice.actions;

export default cameraLocalSlice.reducer;
