import * as React from 'react';
import {Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Forum from './Forum'
import Maps from './Map'
import Profile from './Profile'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useLinkProps } from '@react-navigation/native';
import axios from 'axios';
import { Form } from 'native-base';

const Tab = createMaterialBottomTabNavigator();

function MyTabs(props) {
  const [imageProfil,setImageProfil] = React.useState("");

  React.useEffect(()=>{
    axios.get(props.url+"members/"+props.idProfil).then((reponse)=>{
      setImageProfil(reponse.data.imagePath);
    }).catch((err)=>{
      console.log(err);
    })
  })

  function LogoTitle({navigation}) {
    return (

        <Image
          style={{ width: 25, height: 25,alignSelf:"center",borderRadius:30}}
          source={{uri:imageProfil}}
        />
      

    );
  }




  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#000000' }}
      initialRouteName="Forum"
      tabBarOptions={{
        activeTintColor: 'Teal',
        
      }}
    >
      <Tab.Screen
        name="Forum"
        children={() => <Forum idProfil={props.idProfil} url = {props.url} />}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color = activeTintColor, size = 25 }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      
      />
      <Tab.Screen
        name="Maps"
        children={() => <Maps idProfil={props.idProfil} />}
        options={{
          tabBarLabel: 'Carte',
          tabBarIcon: ({ color, size = 25 }) => (
            <MaterialCommunityIcons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <Profile idProfil={props.idProfil} navigation={props.navigation} url = {props.url}/>}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size = 20 }) => (
            // <MaterialCommunityIcons name="account" color={color} size={size} />
            <LogoTitle />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
