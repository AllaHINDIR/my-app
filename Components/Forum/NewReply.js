import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';


const NewReply = () => {
  const [inputValue, setInputValue] = useState("")
  const titre = "Titre discussion 1"

  return (
    <View style={styles.container}>
      <View style={styles.reply}>
        <View >
          <Text style={styles.titleText}>Re: {titre}</Text>
        </View>

        <Divider style={{ backgroundColor: 'black' }} />
        <View>
          <ScrollView style={{ height: 80 }}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              multiline
            />
          </ScrollView>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            icon={{
              name: "delete",
              size: 20,
              color: "black"
            }}
            type="solid"
            raised
          />
          <Button
            icon={{
              name: "send",
              size: 20,
              color: "black"
            }}
            type='outline'
            raised
          />
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
});
export default NewReply