import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableNativeFeedback } from 'react-native';


function Theme(props) {

  return (
    <TouchableNativeFeedback onPress={() => props.navigation.navigate('Discussions', {idTheme: props.id, titreTheme: props.titre})}>
      <View style={styles.container}>
        <ImageBackground imageStyle={styles.imageStyle} style={styles.imageDimensions} source={{ uri: props.url }}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>
              {props.titre}
              {"\n"}
            </Text>
            <Text> {props.description} </Text>
          </Text>
        </ImageBackground>
      </View>
    </TouchableNativeFeedback>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width ,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center', // centre le texte horizontalement
    //justifyContent: 'center' ,
    //alignItems: 'center',
    flex: 1, // container takes the same area as the parent
    marginTop: 100,
    padding: 5,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  imageStyle: {
    borderRadius: 10,
  },
  imageDimensions: {
    height: 200,
    width: width ,
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});
export default Theme;