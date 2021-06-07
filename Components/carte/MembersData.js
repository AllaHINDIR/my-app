import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView, Dimensions, RefreshControl,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';


function Membre(props) {

  const membre = props.membre;


  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: "https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg" }} >

      <ScrollView>

        <View style={styles.membreeContainer}>
          <Image style={styles.image} source={{ uri: membre.imagePath }} />
          <View style={styles.inputView}>
            <Text style={styles.TextView}> Indicatif : {membre.indicatif}</Text>
            <Text style={styles.TextView}> Prénom : {membre.firstName}</Text>
            <Text style={styles.TextView}> Nom : {membre.lastName}</Text>
            <Text style={styles.TextView}> Email : {membre.email}</Text>
            <Text style={styles.TextView}> Téléphone : {membre.phone}</Text>
            <Text style={styles.TextView}> QTH : </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 25,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  inputView: {
    backgroundColor: "#e7ab3c",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: width - 40,
    paddingHorizontal: 10,
    paddingVertical: 25,
    alignItems: "center",
  },

  membreeContainer: {
    height: height,
    borderColor: "black",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  TextView: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 15,
    width: width - 100,
    backgroundColor: "white",
    margin: 3,
    padding: 3,
  },
});

export default Membre;