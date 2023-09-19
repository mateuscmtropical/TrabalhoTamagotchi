import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import AsyncStorage from "@react-native-async-storage/async-storage";


async function App(): Promise<JSX.Element> {
  const Stack = createNativeStackNavigator();
  const token = await AsyncStorage.getItem('token')

  return (
    <NavigationContainer>
      {
        token
          ? <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} />
          </Stack.Navigator>
          : <Stack.Navigator>
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Home' component={Home} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  )
};

export default App;
