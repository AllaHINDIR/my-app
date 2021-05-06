import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TextInput, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Display from 'react-native-display';
import axios from 'axios';

const Reply = (props) => {
  const enable = props.enable;
  const reply = props.reply;
  const idComment = reply._id;
  const discussion = props.discussion;
  const idTopic = discussion._id;
  const titreTheme = props.titreTheme;

  function decrimentationReponse(){
            const urlDiscussion = props.url + 'topics/delete/Comment/' + idTopic ;
            axios
              .put(urlDiscussion, {})
              .then((reponse) => {
                console.log(reponse.data);
              })
              .catch((err) => {
                console.log(err);
              });
  }

  function deleteReponse() {
    let deleteSuccess = false;
    const url = props.url + "comments/" + idComment
    axios.delete(url)
      .then((reponse) => {
        //console.log(reponse.data)
        showMessage({
          message: 'Réponse supprimée',
          type: 'success',
        })
        deleteSuccess = true;
        decrimentationReponse();
      }).catch((err) => {
        console.log(err)
      })
  }


  return (
    <View style={styles.reply}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View >
          <Image
            style={styles.imageStyle}
            source={{ uri: reply.creator.imagePath }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{reply.creator.lastName} {reply.creator.firstName}</Text>
          <Text>{reply.dateCreation}</Text>
        </View>
      </View >

      <Divider style={{ backgroundColor: 'teal' }} />
      <View>
        <Text style={styles.baseText}> {reply.message}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Display enable={enable}>
          <View>
            <Button
              icon={{
                name: "edit",
                size: 20,
                color: "black"
              }}
              type='outline'
              raised
              onPress={() => {
                props.navigation.navigate(
                  'NewReply',
                  {
                    titreTheme: titreTheme,
                    discussion: discussion,
                    message: reply.message,
                    EnableBtn: true,
                    id: idComment
                  })
              }}
            />
          </View>
        </Display>
        <Display enable={enable}>
          <View>
            <Button
              icon={{
                name: "delete",
                size: 20,
                color: "black"
              }}
              type='outline'
              raised
              onPress={() => {
                Alert.alert(
                  "Attention",
                  "Vous etes sur que vous voulez supprimer cette discussion?",
                  [{
                    text: 'Oui',
                    onPress: () => {
                      //console.log("Reponse Supprimée!");
                      deleteReponse();
                    }
                  },
                  {
                    text: 'Non',
                    onPress: () => {
                      //console.log("Non pressed")
                    },
                    style: "cancel"
                  }]
                )
              }}
            />
          </View>
        </Display>
      </View>

    </View>
  )

}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reply: {
    padding: 10,
    width: width - 40,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 30,
  },
  baseText: {
    fontSize: 16,
    color: '#000000',
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#000000',
  },
  imageStyle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 40,
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default Reply