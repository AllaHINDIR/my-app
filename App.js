import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainApp from './Components/MainApp'
import Acceuil from './Components/Acceuil'
import Login from './Components/Login'

function AcceuilScreen({ navigation }) {
  return (
    <Acceuil
      navigation={navigation}
    />
  );
}

function LoginScreen({ navigation }) {
  return (
    <Login
      navigation={navigation}
    />
  );
}

function MainAppScreen({ navigation }) {
  return (
    <MainApp
      navigation={navigation}
    />
  );
}


const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Acceuil">
        <Stack.Screen name="Acceuil" component={AcceuilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;