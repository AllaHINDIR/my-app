import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

const Acceuil = (props) => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/logo_arram.jpg")} />
            <Image src="" />
            <StatusBar style="auto" />
            <View style={styles.description} >
                <Text style={styles.textDescription} >
                    Cette Application est réservée seulement pour les membres de l'association ARRAM !

                </Text>
            </View>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    props.navigation.replace('Login');
                }}>
                <Text style={styles.loginText}>Continuer</Text>
            </TouchableOpacity>
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
    }
});

export default Acceuil;