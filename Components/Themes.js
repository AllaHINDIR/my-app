import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, RefreshControl, ImageBackground } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { Searchbar } from 'react-native-paper';

import Theme from './Forum/Theme'
import Heading from './Forum/Heading'


const Themes = (props) => {
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
  let url = props.url + 'themes';
  const [listTheme, setListTheme] = useState([]);
  useEffect(() => {
    axios.get(url)
      .then((reponse) => {
        console.log("themes!!")
        setListTheme(reponse.data)
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }, [isFocused, refreshing]);

  //Search
  const [searchQuery, setSearchQuery] = useState('');
  function onChangeSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  //Remplissage des themes
  let ensThemes = []
  for (let i = 0; i < listTheme.length; i++) {
    if (listTheme[i].title.toUpperCase().includes(searchQuery.toUpperCase()) || listTheme[i].description.toUpperCase().includes(searchQuery.toUpperCase())) {
      ensThemes.push(
        <Theme
          theme={listTheme[i]}
          key={listTheme[i]._id}
          navigation={props.navigation} />
      )
    }
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: "https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg" }} >
      <Heading>Themes</Heading>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{backgroundColor: '#111111', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Searchbar
            style={styles.searchBar}
            inputStyle={styles.input}
            iconColor='#ffffff'
            placeholder="Chercher ici..."
            placeholderTextColor="#ffffff"
            onChangeText={onChangeSearch}

            value={searchQuery}

          />
        </View>
        <View style={styles.container}>
          {ensThemes}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#000000',    
    borderRadius: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  searchBar: {
    width: width - 20,
    backgroundColor: '#222222',
    borderRadius: 10,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    color: "#ffffff",
  }
});
export default Themes;