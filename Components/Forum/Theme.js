import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableNativeFeedback } from 'react-native';


function Theme(props) {

  const theme = props.theme

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          props.navigation.navigate(
            'Discussions',
            {
              idTheme: theme._id,
              titreTheme: theme.title
            })
        }}>
        <ImageBackground imageStyle={styles.imageStyle} style={styles.imageDimensions} source={{ uri: theme.image }}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>
              {theme.title}
              {"\n"}
            </Text>
            {/* <Text> {theme.description} </Text> */}
          </Text>
        </ImageBackground>
      </TouchableNativeFeedback>
    </View>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width ,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center', 
    backgroundColor: "rgba(0,0,0,0.75)",
    flex: 1,
    // flexDirection: "column-reverse",
    //width: width -40,
    width: width ,
    marginTop: 140,
    //marginBottom: 10,
    //borderRadius: 20,
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