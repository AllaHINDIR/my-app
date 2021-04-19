import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import {Divider, Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import axios from 'axios';




const NewDiscussion = (props) => {

    const idTheme = props.idTheme;
    const titreTheme = props.titreTheme;
    const idProfil = props.idProfil;
    const idThemeRadio ="6067192fa128f24090128bff";
  
    const [titre, setTitre] = useState("");
    const [inputValue, setInputValue] = useState("");

    function insertNouvelleDiscussion(titre,description) {
            var url = "http://192.168.1.115:5000/topics";

            axios.post(url,{
                title:titre,
                message:description,
                theme:idTheme,
                creator:idProfil   // ici on doit le remplecer par le id du creator 
            }).then((reponse)=> {
                console.log(reponse.data);
                showMessage({
                    message: 'Une nouvelle discussion a été ajouté',
                    type: 'success',
                  });
                setTitre("");
                setInputValue("");
                //props.navigation.navigate('Discussions',{idTheme: props.idTheme, titreTheme: props.titreTheme});
                props.navigation.navigate("Discussions",{idTheme:props.idTheme, titreTheme:props.titreTheme});
            }).catch((err)=>{
                showMessage({
                    message: 'Ajout non reussi!',
                    type: 'danger',
                  });
            })
    }


    return (
        <View style={styles.container}>
        
            <View style={styles.discussion}>
                    <Text style={styles.titreTheme}>{titreTheme}</Text>
                    <Divider style={{ backgroundColor: 'black', marginBottom:20, }} /> 
                    {/* <Divider style={{ backgroundColor: 'black' }} />  */}
                    <Text>Titre: </Text>
                    <TextInput value={titre} style={styles.titleZone} onChangeText={setTitre} />
          
                    <Text>Description: </Text>
                    <ScrollView style={{ height: 80 }}>
                        <TextInput
                            style={styles.DescriptionZone}
                            value={inputValue}
                            onChangeText={setInputValue}
                            multiline
                        />
                    </ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <Button
                        icon={{
                            name: "send",
                            size: 20,
                            color: "black"
                        }}
                        type='outline'
                        raised
                        onPress={ () => {
    
                            insertNouvelleDiscussion(titre,inputValue);
                            
                        }}
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
    discussion: {
        height:400,
        padding: 10,
        width: width - 10,
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderRadius: 10,
        marginVertical: 5,
    },
    titleZone:{
        height:50,
        borderWidth:2,
        borderRadius:8,
   
        
    },
    DescriptionZone:{
        height:150,
        borderWidth:2,
        borderRadius:8,
        textAlignVertical:"top"
        
    },
    titreTheme:{
        fontSize:30,
        alignSelf:'center',
        marginBottom:30,

    }

});
export default NewDiscussion