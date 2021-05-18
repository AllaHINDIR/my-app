import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './Components/MyTabs';
import FlashMessage from 'react-native-flash-message';
import Acceuil from './Components/Acceuil'
import Login from './Components/Login'


const url="http://10.72.176.86:5000/";


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
      url = {url}
    />
  );
}

function MainAppScreen({ navigation, route }) {
  const idProfil = route.params.idProfil;
  return (
    <MyTabs idProfil={idProfil} navigation={navigation} url={url} />
  );
}


const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Acceuil">
        <Stack.Screen name="Acceuil" component={AcceuilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;