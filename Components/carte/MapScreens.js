import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Maps from './Maps';
import RegionMembers from './RegionMembers';
import MembersData from './MembersData';
const Stack = createStackNavigator();
function MapScreens(props) {



  function Map({ navigation}) {
    return (
      <Maps navigation={navigation} url={props.url}/>
    );
  }

  function RegionMembersScreen({navigation, route}){
    const idRegion = route.params.idRegion;
    const regionName = route.params.regionName;

    return(
        <RegionMembers navigation={navigation} idRegion={idRegion} regionName={regionName} url={props.url} />
    );
  }

  function MembersDataScreen({navigation ,route}){
    
    const InformationsMembre = route.params.membre;

   return(
       <MembersData navigation={navigation} membre={InformationsMembre} />
   );
 }

 



  //console.log(props)
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Maps">
        <Stack.Screen name="Maps" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="RegionMembers" component={RegionMembersScreen} options={{ title: 'Membres', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="MembersData" component={MembersDataScreen} options={{ title: 'Informations', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MapScreens;