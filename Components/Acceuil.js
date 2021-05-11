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
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "rgba(0,128,128,0.7)",
    },
});

export default Acceuil;