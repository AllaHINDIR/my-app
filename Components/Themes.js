import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';

import Theme from './Forum/Theme'
import Heading from './Forum/Heading'
import SBar from './Forum/SearchBar'

const Themes = (props) => {
  let url = props.url + 'themes'; 
  const [listTheme, setListTheme] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then((reponse) => {
      setListTheme(reponse.data)
    })
    .catch((erreur) => {
      console.log(erreur)
    })
    
  }, []);

  let ensThemes = []
  for (let i = 0; i < listTheme.length; i++) {
    ensThemes.push(
      <Theme url={listTheme[i].image} titre={listTheme[i].title} description={listTheme[i].description} navigation={props.navigation} key={i} id={listTheme[i]._id} />
    )
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Heading>Themes</Heading>
      <ScrollView>
        <View style={{ backgroundColor: '#111111', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <SBar />
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
});
export default Themes;