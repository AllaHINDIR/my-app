import React from 'react';
import axios from 'axios';
import { View, ScrollView, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import Heading from '../Forum/Heading';

function RegionMembers(props) {
  const [listMembre, setMembres] = React.useState({});
  const url = props.url + 'members/region/' + props.idRegion;
  console.log(url);

  React.useEffect(() => {
    axios
      .get(url)
      .then((reponse) => {
        setMembres(reponse.data.members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(listMembre[0]);

  //Remplissage des themes
  let ensMembres = [];
  for (let i = 0; i < listMembre.length; i++) {
    ensMembres.push(
      <DataTable.Row key={listMembre[i]._id} onPress={() => {
        props.navigation.navigate("MembersData", { membre: listMembre[i] })
      }}>
        <DataTable.Cell><Text style={styles.tableRow}>{listMembre[i].indicatif} </Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableRow}>{listMembre[i].firstName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableRow}>{listMembre[i].lastName}</Text></DataTable.Cell>
      </DataTable.Row>
    );
  }

  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: "https://i.pinimg.com/originals/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg" }} >

      <Heading ><Text>{props.regionName}</Text></Heading>
      <View style={{ flex: 1 }}>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableHeader}>Indicatif</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Prénom</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Nom</Text></DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {ensMembres}
          </ScrollView>
        </DataTable>
      </View>
    </ImageBackground>
  );
}


const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({

  table: {
    margin: 20,
    flex: 1,
    width: width - 40,
    borderRadius: 15,
    backgroundColor: "white"
  },
  tableRow: {
    fontSize: 14,
    color: "gray"
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})

export default RegionMembers;

