import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './Components/MyTabs';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
      <NavigationContainer>
        <MyTabs />
        <FlashMessage position="top" />  
      </NavigationContainer>
  );
}
export default App;