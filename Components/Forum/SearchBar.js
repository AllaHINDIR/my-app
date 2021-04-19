import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { Searchbar } from 'react-native-paper';

const SBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      style={styles.container}
      inputStyle={styles.input}
      iconColor='#ffffff'
      placeholder="Chercher ici..."
      placeholderTextColor="#ffffff"
      onChangeText={onChangeSearch}
      value={searchQuery}

    />
  );
};


const width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
  container: {
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

export default SBar;