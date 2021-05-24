import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView,ImageBackground } from 'react-native';
import {Divider, Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Display from 'react-native-display';
import axios from 'axios';

const NewDiscussion = (props) => {
    const idTheme = props.idTheme;
    const titreTheme = props.titreTheme;
    const idProfil = props.idProfil;

    const [Enable,setEnable] = useState(false);
    const EnableBtn = props.EnableBtn;
  
    const [titre, setTitre] = useState(props.titre);
    const [inputValue, setInputValue] = useState(props.inputValue);

    //pour inserer une nouvelle discussion
    function insertNouvelleDiscussion(titre,description) {
            var url = props.url + "topics";
            axios.post(url,{
                title:titre,
                message:description,
                theme:idTheme,
                creator:idProfil   // ici on doit le remplecer par le id du creator 
            }).then((reponse)=> {
                console.log(reponse.data);
                showMessage({
                    message: 'Une nouvelle discussion a été ajouté',
                    type: 'success',
                  });
                setTitre("");
                setInputValue("");
                setEnable(false);
                props.navigation.navigate("Discussions",{idTheme:props.idTheme, titreTheme:props.titreTheme});
            }).catch(err=> {
                    showMessage({
                        message: 'Ajout échoué',
                        type: 'danger',
                      });
                      setEnable(true);
              });
    }

    //pour modifier le titre/description d'une discussion
    function modifierDiscussion(titre,description) {
        var url = props.url + "topics/" + props.idTopic;

        axios.put(url,{
            title:titre,
            message:description
        }).then((reponse)=> {
            console.log(reponse.data);
            showMessage({
                message: 'La discussion a été modifiée',
                type: 'success',
              });
            setEnable(false);
            props.navigation.navigate("Discussions",{idTheme:props.idTheme, titreTheme:props.titreTheme});
        }).catch(err=> {
                showMessage({
                    message: 'Modification échouée',
                    type: 'danger',
                  });
                  setEnable(true);
          });
}


    return (
      <ImageBackground style={styles.backgroundImage} source={{ uri: "https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg" }} >
        <View style={styles.discussion}>
          <Text style={styles.titreTheme}>{titreTheme}</Text>
          <Display enable={Enable}>
            <Text style={{color: 'red', marginTop: -30, alignSelf: 'center'}}>
              {' '}
              le titre et la description sont obligatoires{' '}
            </Text>
          </Display>
          <Divider style={{backgroundColor: 'black', marginBottom: 20}} />
          {/* <Divider style={{ backgroundColor: 'black' }} />  */}
          <Text>Titre: </Text>
          <TextInput
            value={titre}
            style={styles.titleZone}
            onChangeText={setTitre}
          />

          <Text>Description: </Text>
          <ScrollView style={{height: 80}}>
            <TextInput
              style={styles.DescriptionZone}
              value={inputValue}
              onChangeText={setInputValue}
              multiline
            />
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                  insertNouvelleDiscussion(titre, inputValue);
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
                  modifierDiscussion(titre,inputValue);
                }}
              />
            </Display>
          </View>
        </View>
      </ImageBackground>
    );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  discussion: {
    height: 400,
    padding: 10,
    width: width - 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor: "#000000",
    borderRadius: 10,
    marginVertical: 5,
  },
  titleZone: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  DescriptionZone: {
    height: 150,
    textAlignVertical: "top",
    borderRadius: 8,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",

  },
  ScrollViewDescription: {
    height: 80,
  },
  titreTheme: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    
  }

});
export default NewDiscussion