import {configureStore} from '@reduxjs/toolkit';
//import counterReducer from './counterSlice';
import audioLocalReducer from './audioLocalSlice';
import micLocalReducer from './micLocalSlice';
import cameraLocalReducer from './cameraLocalSlice';
import joinRoomLocalReducer from './joinRoomLocalSlice';
import videoRemoteReducer from './videoRemoteSlice';
//import callMemberListReducer from './callMemberListSlice';
import pinReducer from './pinSlice';
import pinRemoteReducer from './pinRemoteSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    audioLocal: audioLocalReducer,
    micLocal: micLocalReducer,
    cameraLocal: cameraLocalReducer,
    joinRoomLocal: joinRoomLocalReducer,
    videoRemote: videoRemoteReducer,
    pin: pinReducer,
    pinRemote: pinRemoteReducer,
    chat: chatReducer,
    //callMemberList: callMemberListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false, //{warnAfter: 128},
      serializableCheck: false, //{warnAfter: 128},
    }),
});
