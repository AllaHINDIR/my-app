import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discussions from './Discussions';
import Replies from './Replies';
import Themes from './Themes';
import NewReply from './Forum/NewReply';
import NewDiscussion from './Forum/NewDiscussion'


const url = "http://192.168.1.17:5000/" //adresse ip du pc (localHost ne fonctionne pas);
const idprofil = "60679385a128f24090128c03";

function ThemesScreen({ navigation }) {
  return (
    <Themes
      navigation={navigation}
      url={url} />
  );
}
function DiscussionsScreen({ navigation, route }) {
  //route assure le passage des parametres 
  const idTheme = route.params.idTheme;
  const titreTheme = route.params.titreTheme;

  return (
    <Discussions
      navigation={navigation}
      idTheme={idTheme}
      titreTheme={titreTheme}
      idProfil={idprofil}
      url={url} />
  );
}

function NewDiscussionScreen({ navigation, route }) {
  const idTheme = route.params.idTheme;
  const titreTheme = route.params.titreTheme;
  const titre = route.params.titre;
  const inputValue = route.params.inputValue;

  const EnableBtn = route.params.EnableBtn;
  const idTopic = route.params.idTopic;
  return (
    <NewDiscussion
      navigation={navigation}
      url={url}
      idTopic={idTopic}
      idTheme={idTheme}
      titreTheme={titreTheme}
      titre={titre}
      inputValue={inputValue}
      EnableBtn={EnableBtn}
      idProfil={idprofil} />
  );
}

function RepliesScreen({ navigation, route }) {
  const titreTheme = route.params.titreTheme;
  const discussion = route.params.discussion;
  const idTopic = route.params.idTopic;
  //console.log(discussion)
  return (
    <Replies
      navigation={navigation}
      titreTheme={titreTheme}
      url={url}
      idTopic={idTopic}
      idProfil={idprofil}
      discussion={discussion} />
  );
}

function NewReplyScreen({ navigation, route }) {
  const titreTheme = route.params.titreTheme;
  const discussion = route.params.discussion;
  const message = route.params.message;
  const id = route.params.id;
  const EnableBtn = route.params.EnableBtn;
  return (
    <NewReply
      navigation={navigation}
      discussion={discussion}
      titreTheme={titreTheme}
      idProfil={idprofil}
      message={message}
      EnableBtn={EnableBtn}
      id={id}
      url={url} />
  );
}

const Stack = createStackNavigator();
function Forum() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Themes">
        <Stack.Screen name="Themes" component={ThemesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Replies" component={RepliesScreen} options={{ title: 'Reponses', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="NewReply" component={NewReplyScreen} options={{ title: 'Nouvelle Réponse', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="NewDiscussion" component={NewDiscussionScreen} options={{ title: 'Nouvelle Discussions', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="Discussions" component={DiscussionsScreen} options={{ title: 'Discussions', headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Forum;