import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import Display from 'react-native-display';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

const Discussion = (props) => {
  const EnableReplay = props.EnableReplay;
  const discussion = props.discussion;
  const idTopic = discussion._id;
  // const [numComments,setnumComments] = useState(0);
  const enable = props.discussion.creator._id == props.idProfil;

  // const urlCount = props.url + "comments/topics/" + idTopic + "/count"
  // useEffect(() => {
  //    axios
  //     .get(urlCount)
  //     .then((reponse) => {
  //       setnumComments(reponse.data);
  //     })
  //     .catch((erreur) => {
  //       console.log(erreur);
  //     });
  // }, []);
 

  function deletDiscussion(){
    const url = props.url + "topics/" + idTopic
    axios.delete(url).then((reponse)=>{
      console.log(reponse.data);
      showMessage({
        message: 'La discussion a été supprimée',
        type: 'success',
      });
      
    }).catch((err)=>{
      console.log(err);
      showMessage({
        message: 'Supprission échouée!',
        type: 'danger',
      });
    })
  }
 
  return (
    
    <View style={styles.discussion} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Image
            style={styles.imageStyle}
            source={{ uri: discussion.creator.imagePath }} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{discussion.creator.lastName} {discussion.creator.firstName}</Text>
          <Text>{discussion.dateCreation}</Text>
        </View>
        <View>
          <Text>{discussion.numComments} reponses</Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: 'teal' }} />
      <View>
        <Text style={styles.titleText}> {discussion.title}</Text>
        <Text style={styles.baseText}> {discussion.message}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Display enable={enable}>
          <View>
            <Button
              buttonStyle={{ marginHorizontal: 2 }}
              icon={{
                name: 'edit',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
              onPress={() => {
                props.navigation.navigate(
                  'NewDiscussion',
                  {
                    idTheme: props.idTheme,
                    titreTheme: props.titreTheme,
                    titre: discussion.title,
                    inputValue: discussion.message,
                    idTopic: idTopic,
                    EnableBtn: true,
                  });
              }
              }
            />
          </View>
        </Display>
        <Display enable={enable}>
          <View>
            <Button
              buttonStyle={{ marginHorizontal: 2 }}
              icon={{
                name: 'delete',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
              onPress={() => {
                Alert.alert(
                  "Attention",
                  "Vous etes sur que vous voulez supprimer cette discussion?",
                  [
                    {
                      text: 'Oui', onPress: () => {
                        //console.log("discussion Supprimée!");
                        deletDiscussion();
                      }
                    },
                    {
                      text: 'Non',
                      onPress: () => {
                        //console.log("Non pressed")
                      },
                      style: "cancel"
                    }
                  ]
                );


              }
              }
            />
          </View>
        </Display>
        <Display enable={EnableReplay} >
        <Button
          buttonStyle={{ marginHorizontal: 2 }}
          icon={{
            name: 'reply',
            size: 20,
            color: 'black',
          }}
          type="outline"
          raised
          onPress={() => {
            props.navigation.navigate(
              'Replies',
              {
                titreTheme: props.titreTheme,
                discussion: discussion,
                idTopic: idTopic
              })
          }}
        />
        </Display>
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
  discussion: {
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
});
export default Discussion;