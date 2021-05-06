import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
// import SBar from './Forum/SearchBar'
import { Searchbar } from 'react-native-paper';
import Discussion from './Forum/Discussion'
import Heading from './Forum/Heading'

function Discussions(props) {
  let ensDis = []
  const idTheme = props.idTheme;
  const titreTheme = props.titreTheme;
  const idProfil = props.idProfil;
  let Enable = false;
  const isFocused = useIsFocused();

  //pour rafraichir la page : 
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      setRefreshing(false);
    });
  }, []);

  //pour la récupération des donnés
  let url = props.url + 'topics/themes/' + idTheme;
  const [listDiscussions, setListDiscussions] = useState([]);
  useEffect(() => {
    axios.get(url)
      .then((reponse) => {
        setListDiscussions(reponse.data);
        //console.log("executé !");
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
  //pour construire la liste des discussions
  for (let i = 0; i < listDiscussions.length; i++) {
    if (listDiscussions[i].title.toUpperCase().includes(searchQuery.toUpperCase()) || listDiscussions[i].message.toUpperCase().includes(searchQuery.toUpperCase())) {

      if (listDiscussions[i].creator._id == idProfil) {
        Enable = true;
      } else {
        Enable = false;
      }
      ensDis.push(
        <Discussion
          key={listDiscussions[i]._id}
          navigation={props.navigation}
          discussion={listDiscussions[i]}
          idProfil={idProfil}
          EnableReplay={true}
          url={props.url}
          idTheme={idTheme}
          titreTheme={titreTheme}
        />
      )
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Heading> {titreTheme}</Heading>

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
          {ensDis}
        </View>

      </ScrollView>
      <ActionButton
        buttonColor="teal"
        onPress={() => {
          console.log("nouvelle discussion")
          props.navigation.navigate('NewDiscussion', { idTheme: props.idTheme, titreTheme: props.titreTheme, titre: "", inputValue: "", EnableBtn: false });
        }}
      />
    </View>
  );

};



const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#000000',
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
export default Discussions