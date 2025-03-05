import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SetUsernameScreen from '../screens/SetUsernameScreen';
import RoomsListScreen from '../screens/RoomsListScreen';
import CreateRoomScreen from '../screens/CreateRoomScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SetUsername">
      <Stack.Screen
        name="SetUsername"
        component={SetUsernameScreen}
        options={{title: 'New User'}}
      />
      <Stack.Screen
        name="RoomsList"
        component={RoomsListScreen}
        options={{title: 'Chat Rooms'}}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoomScreen}
        options={{title: 'Create a Room'}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{title: 'Chat'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
