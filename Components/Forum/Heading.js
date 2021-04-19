import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Heading = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {props.children}
      </Text>
    </View>
  );
}

const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#111111',
    borderRadius: 0,
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 40,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default Heading;