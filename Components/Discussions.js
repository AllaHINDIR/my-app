import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView ,RefreshControl, View, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';

import SBar from './Forum/SearchBar'
import Discussion from './Forum/Discussion'
import Heading from './Forum/Heading'


function Discussions(props) {
  let ensDis = []
  const idTheme = props.idTheme;
  const titreTheme = props.titreTheme;
  const idProfil = props.idProfil;
  let Enable = false;
  const isFocused = useIsFocused();

  // //pour rafraichir la page : 
  // const wait = (timeout) => {
  //   return new Promise(resolve => setTimeout(resolve, timeout));
  // }
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(100).then(() => setRefreshing(false));
  //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  // }, []);

  let url = props.url + 'topics/themes/' + idTheme; 
  const [listDiscussions, setListDiscussions] = useState([]);
  
  useEffect(()=>{
    //console.log("coucou");
    axios.get(url)
    .then((reponse) => {
      setListDiscussions(reponse.data);
      console.log("executé !!! ");
    })  
    .catch((erreur) => {
      console.log(erreur)
    })

  },[isFocused]);


//  if (listDiscussions != []) {
//    console.log(listDiscussions);
//    console.log(listDiscussions[0].title)
//    console.log(listDiscussions[0].creator)
//    console.log(listDiscussions[0].creator.lastName)
//  }



  
  for (let i = 0; i < listDiscussions.length; i++) {
    if (listDiscussions[i].creator._id == idProfil) {
      Enable = true;
    }else{
      Enable = false;
    }
    ensDis.push(
      <Discussion enable={Enable} titre={listDiscussions[i].title} description={listDiscussions[i].message} url={listDiscussions[i].creator.image} nom={listDiscussions[i].creator.lastName} prenom={listDiscussions[i].creator.firstName} date={listDiscussions[i].dateCreation} /*heure={listDiscussions[i].} */ reponse={0}/**/ navigation={props.navigation} id={listDiscussions[i]._id} />
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Heading> {titreTheme}</Heading>

      <ScrollView >
        <View style={{ backgroundColor: '#111111', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <SBar />
        </View>
        <View style={styles.container}>
          {ensDis}
        </View>

      </ScrollView>
      <ActionButton
        buttonColor="gray"
        onPress={() => {
          console.log("nouvelle discussion")
          props.navigation.navigate('NewDiscussion',{idTheme: props.idTheme, titreTheme: props.titreTheme})
        }}
      />
    </View>
  );

};



const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Discussions