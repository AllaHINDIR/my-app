import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Forum from './Forum'
import Maps from './Map'
import Profile from './Profile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#000000' }}
      initialRouteName="Forum"
      tabBarOptions={{
        activeTintColor: '#309930',
      }}
    >
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color, size=20 }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarLabel: 'Carte',
          tabBarIcon: ({ color, size=20 }) => (
            <MaterialCommunityIcons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size=20 }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default MyTabs;
