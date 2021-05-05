import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl, Dimensions } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import ActionButton from 'react-native-action-button';
import Heading from './Forum/Heading'
import Reply from './Forum/Reply'
import Discussion from './Forum/Discussion'

import axios from 'axios';

const Replies = (props) => {
  // let discussion = props.discussion;
  let Enable = false;
  // let EnableDiscussion = discussion.creator._id == idProfil;

  const idProfil = props.idProfil;
  const titreTheme = props.titreTheme;

  // const idTopic = discussion._id;
  const isFocused = useIsFocused();

  
  //pour rafraichir la page : 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      setRefreshing(false);
    });
  }, []);

  const [discussion, setDiscussion] = useState(props.discussion);
  const idTopic =  props.idTopic;
  let urlDisc = props.url + "topics/" + idTopic
  useEffect(() => {
    axios.get(urlDisc)
      .then((reponse) => {
        //console.log(reponse.data)
        setDiscussion(reponse.data.Topic);
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }, [isFocused, refreshing]);


  
  //pour la récupération des donnés
  let url = props.url + 'comments/topics/' + idTopic;
  const [listReplies, setListReplies] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((reponse) => {
        setListReplies(reponse.data);
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }, [isFocused, refreshing]);

  let ensRep = []
  for (let i = 0; i < listReplies.length; i++) {
    if (listReplies[i].creator._id == idProfil) {
      Enable = true;
    } else {
      Enable = false;
    }
    ensRep.push(
      <Reply
        key={listReplies[i]._id}
        reply={listReplies[i]}
        enable={Enable}
        url={props.url}
        navigation={props.navigation}
        titreTheme={titreTheme}
        discussion={discussion} />
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Heading> {titreTheme}</Heading>
      <View style={styles.discussion} >

     
      <Discussion
            key={discussion._id}
            discussion={discussion}
            idProfil={idProfil}
            EnableReplay={false}
            url={props.url} />
             </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          {ensRep}
        </View>
      </ScrollView>
      <ActionButton
        buttonColor="gray"
        onPress={() => {
          props.navigation.navigate(
            'NewReply',
            {
              titreTheme: titreTheme,              
              discussion: discussion,
              message: "",
              id:"",
              EnableBtn: false
            })
        }}
      />
    </View>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discussion:{
    borderWidth:  3,
    borderRadius:10,
    borderColor:  'teal'
  }
});
export default Replies