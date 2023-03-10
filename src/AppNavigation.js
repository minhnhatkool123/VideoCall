import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './HomePage';
import VideoConferencePage from './VideoConferencePage';
import Waiting from './Waiting';

const Stack = createNativeStackNavigator();

export default function AppNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        options={{headerShown: false}}
        headerMode="none"
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VideoConferencePage"
        component={VideoConferencePage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WaitingPage"
        component={Waiting}
      />
    </Stack.Navigator>
  );
}
