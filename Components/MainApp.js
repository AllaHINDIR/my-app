import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './MyTabs';
import FlashMessage from 'react-native-flash-message';

const MainApp = () => {
  return (
      <NavigationContainer independent={true}>
        <MyTabs />
        <FlashMessage position="top" />  
      </NavigationContainer>
  );
}
export default MainApp;