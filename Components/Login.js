import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input} from 'react-native-elements';


import axios from 'axios';



const Login = (props) => {
    const [indicatif, setIndicatif] = useState("");
    const [password, setPassword] = useState("");
    // const [idProfil, setIdProfil] = useState("");
    // const [loginSuccess, setLoginSuccess] = useState(false);
    var loginSuccess = false;
    var idProfil = "";
    
     function login(indicatif, password) {
        var url = props.url +  "login";
            axios.post(url, {
                indicatif: indicatif,
                password: password
            }).then((reponse) => {
                // setIdProfil(reponse.data.memberId);
                idProfil = reponse.data.memberId;
                // setLoginSuccess(true);
                loginSuccess = true;
                console.log( "fct2 " + loginSuccess);

                    if(loginSuccess){
                        props.navigation.replace('MainApp', {idProfil: idProfil});
                        loginSuccess = false
                    }
            }).catch(err => {
                console.log(err)     
            });
    }



    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <Input
            placeholder="Indicatif *"
            leftIcon={{type: 'font-awesome', name: 'user-circle'}}
            style={styles.TextInput}
            onChangeText={(email) => setIndicatif(email)}
            
          />

          {/* <TextInput
            style={styles.TextInput}
            placeholder="Indicatif *"
            placeholderTextColor="gray"
            onChangeText={(email) => setIndicatif(email)}
          /> */}
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Mot de passe *"
            leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}
            style={styles.TextInput}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          {/* <TextInput
            style={styles.TextInput}
            placeholder="Mot de passe *"
            placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> */}
        </View>

        {/* <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity> */}

       
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={ () => {
                 login(indicatif, password)
          }}
        >
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


    inputView: {
        backgroundColor: "#e7ab3c",
        borderRadius: 30,
        width: "80%",
        height: 50,
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
        width: "50%",
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#e7ab3c",
        
    },
    loginText:{
        color:"black",
    },
});

export default Login;