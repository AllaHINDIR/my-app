import React from 'react';
import axios from 'axios';
import {View, ScrollView,Image} from 'react-native';
import {DataTable} from 'react-native-paper';
import { Text } from 'native-base';

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
      <DataTable.Row key={listMembre[i]._id} onPress={()=>{
        props.navigation.navigate("MembersData")
      }}>
        <DataTable.Cell >{listMembre[i].indicatif}</DataTable.Cell>
        <DataTable.Cell>{listMembre[i].firstName}</DataTable.Cell>
        <DataTable.Cell>{listMembre[i].lastName}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  return (
    <View>
    
    <ScrollView>
    
    <DataTable>
        <DataTable.Header>
          <DataTable.Title>Indicatif</DataTable.Title>
          <DataTable.Title>Prènom</DataTable.Title>
          <DataTable.Title>Nom</DataTable.Title>
        </DataTable.Header>

        {ensMembres}
      </DataTable>
    </ScrollView>

    </View>
  );
}

export default RegionMembers;
