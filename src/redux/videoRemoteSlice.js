import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  remoteUsers: [],
  lengthOfRemoteUsers: 0,
  pinVideoRemote: [],
};

export const videoRemoteSlice = createSlice({
  name: 'videoRemote',
  initialState,
  reducers: {
    addUserRemote: (state, action) => {
      //state.remoteUsers.push(action.payload);
      state.remoteUsers = action.payload;
    },
    removeUserRemote: (state, action) => {
      const newRemoteUsers = state.remoteUsers.filter(
        user => user.userID !== action.payload,
      );
      state.remoteUsers = newRemoteUsers;
    },

    changeCamera: (state, action) => {
      state.remoteUsers = state.remoteUsers.map(user => {
        if (user.userID === action.payload.userID) {
          return {
            ...user,
            isCameraDeviceOn: action.payload.isCameraDeviceOn,
            streamID: action.payload.streamID,
          };
        }
        return user;
      });
    },
    changeSound: (state, action) => {
      state.remoteUsers = state.remoteUsers.map(user => {
        if (user.userID === action.payload.userID) {
          return {
            ...user,
            soundLevel: action.payload.soundLevel,
          };
        }
        return user;
      });
    },
    changeMic: (state, action) => {
      state.remoteUsers = state.remoteUsers.map(user => {
        if (user.userID === action.payload.userID) {
          return {
            ...user,
            isMicDeviceOn: action.payload.isMicDeviceOn,
          };
        }
        return user;
      });
    },
    getLengthOfRemoteUser: (state, action) => {
      state.lengthOfRemoteUsers = action.payload;
    },
    resetVideoRemote: state => {
      const newRemoteUsers = [];
      state.remoteUsers = newRemoteUsers;
    },
    resetLengthOfRemoteUser: (state, action) => {
      state.lengthOfRemoteUsers = 0;
    },
  },
});

export const {
  addUserRemote,
  removeUserRemote,
  getLengthOfRemoteUser,
  resetVideoRemote,
  resetLengthOfRemoteUser,
  changeCamera,
  changeSound,
  changeMic,
} = videoRemoteSlice.actions;

export default videoRemoteSlice.reducer;
