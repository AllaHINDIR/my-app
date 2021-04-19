import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import Display from 'react-native-display';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

const Discussion = (props) => {
  const enable = props.enable;
  const iddiscussion = props.id;

 

  function deletDiscussion(){
    const url ="http://192.168.1.115:5000/topics/" + iddiscussion ;
    axios.delete(url).then((reponse)=>{
      console.log(reponse.data);
      showMessage({
        message: 'La discussion a été supprimée',
        type: 'success',
      });
    }).catch((err)=>{
      console.log(err);
    })
  }
 
  return (
    <View style={styles.discussion}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={
            {
              //backgroundColor: 'blue'
            }
          }
        >
          <Image style={styles.imageStyle} source={{uri: props.url}} />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text>
            {props.nom} {props.prenom}
          </Text>
          <Text>
            {props.date} {/*props.heure*/}
          </Text>
        </View>
        <View>
          <Text>{props.reponse} reponses</Text>
        </View>
      </View>

      <Divider style={{backgroundColor: 'red'}} />
      <View>
        <Text style={styles.titleText}> {props.titre}</Text>
        <Text style={styles.baseText}> {props.description}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Display enable={enable}>
          <View>
            <Button
              buttonStyle={{marginHorizontal: 2}}
              icon={{
                name: 'edit',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
            />
          </View>
        </Display>
        <Display enable={enable}>
          <View>
            <Button
              buttonStyle={{marginHorizontal: 2}}
              icon={{
                name: 'delete',
                size: 20,
                color: 'black',
              }}
              type="outline"
              raised
              onPress={()=>{
                  Alert.alert(
                    "Attention",
                    "Vous etes sur que vous voulez supprimer cette discussion?",
                    [
                      {
                          text:'Oui',onPress:()=>{
                            console.log("discussion Supprimée!");
                            deletDiscussion();}
                      },
                      {
                        text:'Non',
                        onPress:()=>{console.log("Non pressed")},
                        style:"cancel"
                      }
                    ]
                  );
                
              }
              }
            />
          </View>
        </Display>
        <Button
          buttonStyle={{marginHorizontal: 2}}
          icon={{
            name: 'reply',
            size: 20,
            color: 'black',
          }}
          type="outline"
          raised
          onPress={() => {
            props.navigation.navigate('Replies');
          }}
        />
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