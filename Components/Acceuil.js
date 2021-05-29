import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground
} from "react-native";

const Acceuil = (props) => {

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: 'https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg',
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/logo_arram.png')}
          />

          <StatusBar style="auto" />
          <View style={styles.description}>
            <Text style={styles.textDescription}>
              Cette Application est réservée seulement pour les membres de
              l'association ARRAM !
            </Text>
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              props.navigation.replace('Login');
            }}
          >
            <Text style={styles.loginText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: "rgba(255,255,255,0.5)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:20,
        marginHorizontal:30,
        paddingVertical:20,
    },

    image: {
        marginBottom: 40,
        
    },

    loginBtn: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#e7ab3c",
    },
    description:{
        alignContent:"center",
        marginHorizontal:50,
        
    },
    textDescription:{
        alignSelf:"center",
        textAlign:"center",
        fontSize:16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        
      },
});

export default Acceuil;