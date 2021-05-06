import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Display from 'react-native-display';
import axios from 'axios';

const NewReply = (props) => {
  const [inputValue, setInputValue] = useState(props.message)
  const discussion = props.discussion
  const idTopic = discussion._id;
  const idProfil = props.idProfil;
  const titre = discussion.title;
  const titreTheme = props.titreTheme;
  const idComment = props.id;

  const [Enable, setEnable] = useState(false);
  const EnableBtn = props.EnableBtn;

function incrimenterReponse(){
  const urlDiscussion = props.url + "topics/add/Comment/" + idTopic ;
  axios.put(urlDiscussion, {})
    .then((reponse) => {
      console.log(reponse.data);
    }).catch((err) => {
      console.log(err)
    })
}

  function insertNouvelleReponse(contenu) {
    var url = props.url + "comments/";
    axios.post(url, {
      message: contenu,
      topic: idTopic,
      creator: idProfil
    }).then((reponse) => {
      //console.log(reponse.data);
      showMessage({
        message: 'Une nouvelle réponse a été ajoutée',
        type: 'success',
      });
      setInputValue("");
      setEnable(false);
      incrimenterReponse();
      props.navigation.navigate(
        'Replies',
        {
          idTopic: idTopic,
          titreTheme: titreTheme,
          discussion: discussion
        })
    }).catch((err) => {
      showMessage({
        message: 'Ajout non reussi!',
        type: 'danger',
      });
      setEnable(true);
    })
  }

  function ModifierReponse(contenu) {
    var url = props.url + "comments/" + idComment;
    console.log(url)
    axios.put(url, {
      message: contenu
    }).then((reponse) => {
      //console.log(reponse.data);
      showMessage({
        message: 'La réponse a été modifiée',
        type: 'success',
      });
      setEnable(false);
      //setInputValue("");
      props.navigation.navigate(
        'Replies',
        {
          idTopic: idTopic,
          titreTheme: titreTheme,
          discussion: discussion
        })
    }).catch((err) => {
      showMessage({
        message: 'Modification non reussi!',
        type: 'danger',
      });
      setEnable(true);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.discussion}>
      <Text style={styles.titreTheme}> {titreTheme}</Text>
        <Display enable={Enable}>
          <Text style={{ color: 'red', marginTop: -30, alignSelf: 'center' }}>
            {' '}
              le contenu est obligatoire{' '}
          </Text>
        </Display>
        <Divider style={{ backgroundColor: 'black', marginBottom: 20 }} />
        {/* <Divider style={{ backgroundColor: 'black' }} />  */}
        <Text style={styles.titleText}>Re: {titre}</Text>

        <Text>Contenu: </Text>
        <ScrollView style={{ height: 80 }}>
          <TextInput
            style={styles.DescriptionZone}
            value={inputValue}
            onChangeText={setInputValue}
            multiline
          />
        </ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Display enable={!EnableBtn}>
            <Button
              icon={{
                name: 'send',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
              onPress={() => {
                insertNouvelleReponse(inputValue);
              }}
            />
          </Display>
          <Display enable={EnableBtn}>
            <Button
              icon={{
                name: 'edit',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
              onPress={() => {
                ModifierReponse(inputValue);
              }}
            />
          </Display>
        </View>
      </View>
    </View>
  );
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
    width: width - 10,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: 10,
    marginVertical: 5,
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
  DescriptionZone: {
    height: 150,
    borderWidth: 2,
    borderRadius: 8,
    textAlignVertical: "top",

    padding: 10

  },
  container: {
    width: width,
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discussion: {
    height: 400,
    padding: 10,
    width: width - 10,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: 10,
    marginVertical: 5,
  },
  titleZone: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,

  },
  DescriptionZone: {
    height: 150,
    borderWidth: 2,
    borderRadius: 8,
    textAlignVertical: "top",
    padding: 10,
  },
  titreTheme: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,

  }

});

export default NewReply