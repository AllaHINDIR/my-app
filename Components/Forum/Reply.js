import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Divider, Button } from 'react-native-elements';

const Reply = (props) => {
  return (
    <View style={styles.reply}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ backgroundColor: 'blue' }}>
          <Image
            style={styles.imageStyle}
            source={{ uri: props.url }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{props.nom} {props.prenom}</Text>
          <Text>{props.date}, {props.heure}</Text>
        </View>
      </View >

      <Divider style={{ backgroundColor: 'red' }} />
      <View>
        <Text style={styles.baseText}> {props.contenu}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          icon={{
            name: "edit",
            size: 20,
            color: "black"
          }}
          type='outline'
          raised
        />
        <Button
          icon={{
            name: "delete",
            size: 20,
            color: "black"
          }}
          type='outline'
          raised
        />
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
    //   marginVertical: 5, 
    //   resizeMode: 'cover', 
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