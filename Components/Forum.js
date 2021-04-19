import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Discussions from './Discussions';
import Replies from './Replies';
import Themes from './Themes';
import NewDiscussion from './Forum/NewDiscussion'


const url = "http://192.168.1.115:5000/" //adresse ip du pc (localHost ne fonctionne pas);
const idprofil = "60779765a40234020d947993";

function ThemesScreen({ navigation }) {
  return (
    <Themes navigation={navigation} url = {url} />
  );
}
function DiscussionsScreen({ navigation, route }) {
  //route assure le passage des parametres 
  const idTheme = route.params.idTheme;
  const titreTheme = route.params.titreTheme;

  return (
    <Discussions navigation={navigation} idTheme={idTheme} titreTheme={titreTheme} idProfil={idprofil} url= {url}/>
  );
}

function NewDiscussionScreen({ navigation, route}) {
  const idTheme = route.params.idTheme;
  const titreTheme = route.params.titreTheme;
  return (
    <NewDiscussion navigation={navigation} idTheme={idTheme} titreTheme={titreTheme} idProfil={idprofil}/>
  );
}

function RepliesScreen() {
  return (
    <Replies />
  );
}

const Stack = createStackNavigator();
function Forum() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Themes">
        <Stack.Screen name="Themes" component={ThemesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Replies" component={RepliesScreen} />
        <Stack.Screen name="NewDiscussion" component={NewDiscussionScreen} options={{ title: 'Nouvelle Discussions', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="Discussions" component={DiscussionsScreen} options={{ title: 'Discussions', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Forum;