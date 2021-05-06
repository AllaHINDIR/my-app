import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { Searchbar } from 'react-native-paper';

import Theme2 from './Forum/Theme2'
import Heading from './Forum/Heading'
// import SBar from './Forum/SearchBar'

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
        <Theme2
          theme={listTheme[i]}
          key={listTheme[i]._id}
          navigation={props.navigation} />
      )
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Heading>Themes</Heading>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ backgroundColor: '#111111', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          {/* <SBar /> */}
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
    </View>
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