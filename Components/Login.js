import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

import axios from 'axios';


const Login = (props) => {
    const [indicatif, setIndicatif] = useState("");
    const [password, setPassword] = useState("");
    const [idProfil, setIdProfil] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    function login(indicatif, password) {
        var url = "http://192.168.1.12:5000/login";
        axios.post(url, {
            indicatif: indicatif,
            password: password
        }).then((reponse) => {
            setIdProfil(reponse.data.memberId);
            setLoginSuccess(true);
        }).catch(err => {
            console.log(err)
        });
    }
    
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Indicatif"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setIndicatif(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    login(indicatif, password);
                    if (loginSuccess) {
                        props.navigation.replace(
                            'MainApp',
                            { idProfil: idProfil }
                        );
                    }
                }}>
                <Text style={styles.loginText}>LOGIN</Text>
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

    inputView: {
        backgroundColor: "rgba(0,128,128,0.3)",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
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

export default Login;