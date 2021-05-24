import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import MapView , {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
const mapStyle = require('./mapStyle.json');

function Maps(props) {

  const [listVilles,setListVilles] = React.useState([]);
  const url = props.url + "regions";
  React.useEffect(()=>{
    axios.get(url).then((reponse)=>{
      setListVilles(reponse.data.regions);
      //console.log(reponse.data.regions);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 33.9716,
          longitude: -6.8498,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        showUserLocation={true}
        toolbarEnabled={true}
        loadingEnabled={true}
      >
      {listVilles.map((marker) => (
        <Marker
        onPress = {() => {
          props.navigation.navigate("RegionMembers",{idRegion:marker._id})
        }}
          key={marker._id} 
          coordinate={{longitude: marker.longitude, latitude: marker.latitude}}>
        </Marker>
      ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
export default Maps;