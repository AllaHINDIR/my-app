import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text, TextInput,
  View, ScrollView, Dimensions, RefreshControl,
  Image,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';

import Heading from './Forum/Heading'


const width = Dimensions.get('window').width; //full width
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
    <View style={styles.container}>
      <Heading> Profile</Heading>
      <ScrollView style={{ width: "100%" }}>

        <View style={styles.container}>
          {/* <Image style={styles.image} source={profil.imagePath} /> */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },

  inputView: {
    backgroundColor: "#FACB76",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: width - 40,
    padding: 10,
    alignItems: "center",
  },

  TextInput: {
    //height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    marginVertical: 20,
    backgroundColor: "#e7ab3c",
  },
});

export default Profile