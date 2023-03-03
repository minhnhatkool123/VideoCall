import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const pinRemoteSlice = createSlice({
  name: 'pinRemote',
  initialState,
  reducers: {
    setPinRemote: (state, action) => {
      state.value = action.payload;
    },
    resetPinRemote: state => {
      state.value = '';
    },
  },
});

export const {setPinRemote, resetPinRemote} = pinRemoteSlice.actions;

export default pinRemoteSlice.reducer;
