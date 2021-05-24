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
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';

import Heading from './Forum/Heading'


function Profile(props) {
  const isFocused = useIsFocused();
  //pour rafraichir la page : 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      setRefreshing(false);
    });
  }, []);

  //Recuperation des données
  let url = props.url +  "members/" + props.idProfil;
  const [profil, setProfil] = useState([]);
  useEffect(() => {
    axios.get(url)
      .then((reponse) => {
        console.log("Profil!!")
        setProfil(reponse.data)
        //console.log(reponse.data)
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }, [isFocused, refreshing]);

  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: "https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg" }} >
      <Heading> Profile</Heading>
      <ScrollView>

        <View style={styles.profileContainer}>
          <Image style={styles.image} source={{ uri: profil.imagePath }} />
          <View style={styles.inputView}>
            <Text style={styles.TextView}> Prénom : {profil.firstName}</Text>
            <Text style={styles.TextView}> Nom : {profil.lastName}</Text>
            <Text style={styles.TextView}> Indicatif : {profil.indicatif}</Text>
            <Text style={styles.TextView}> CIN : {profil.cin}</Text>
            <Text style={styles.TextView}> Email : {profil.email}</Text>
            <Text style={styles.TextView}> Téléphone : {profil.phone}</Text>
            <Text style={styles.TextView}> Adresse : {profil.adresse}</Text>
          </View>
          <TouchableOpacity style={styles.loginBtn}
            onPress={() => {
              Alert.alert(
                "Attention",
                "Vous etes sur que vous voulez vous déconnecter ?",
                [{
                  text: 'Oui',
                  onPress: () => {
                    console.log("Déconnection");
                    props.navigation.replace('Login');
                  }
                },
                {
                  text: 'Non',
                  onPress: () => {
                    console.log("Non pressed")
                  },
                  style: "cancel"
                }]
              )
            }}
          >
            <Text style={styles.loginText}>Déconnexion</Text>
          </TouchableOpacity>
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

  profileContainer: {
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
  loginBtn: {
    width: "50%",
    marginHorizontal: "25%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    backgroundColor: "#e7ab3c",
  },
});

export default Profile