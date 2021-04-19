import * as React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import Heading from './Forum/Heading'
import Reply from './Forum/Reply'
import NewReply from './Forum/NewReply'
import Discussion from './Forum/Discussion'

const Replies = () => {
  const Dis = ["Titre discussion 1", "Description 1", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure", "5 réponses"]
  const Rep = [
    ["Réponse 1", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
    ["Réponse 2", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
    ["Réponse 3", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
    ["Réponse 4", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
    ["Réponse 5", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
    ["Reponse 6", "https://images.philips.com/is/image/PhilipsConsumer/AE1850_00-IMS-fr_MA?$jpglarge$&wid=960", "nom", "prenom", "date", "heure"],
  ]

  let ensRep = []
  for (let i = 0; i < Rep.length; i++) {
    ensRep.push(
      <Reply contenu={Rep[i][0]} url={Rep[i][1]} nom={Rep[i][2]} prenom={Rep[i][3]} date={Rep[i][4]} heure={Rep[i][5]} key={i}/>
    )
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <Heading> Reponses</Heading>

      <ScrollView>
        <View style={styles.container}>
          <Discussion titre={Dis[0]} description={Dis[1]} url={Dis[2]} nom={Dis[3]} prenom={Dis[4]} date={Dis[5]} heure={Dis[6]} reponse={Dis[7]} />
          {ensRep}
        </View>
      </ScrollView>
      <NewReply />
    </View>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Replies