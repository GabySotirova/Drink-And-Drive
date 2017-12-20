import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform, Button } from 'react-native';
import { Constants, Location, Permissions, Ionicons } from 'expo';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
  state = {
    mapReady: false,
    region: {
      longitude: 57,
      latitude: 9.9,
      longitudeDelta: 0.04,
      latitudeDelta:  0.09
    },
    markerPosition: {
      latitude: -122,
      longitude: 37
    },
    location: null,
    errorMessage: null,
    markerTitle: "",
    screenName: "",
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    headerRight = (
      <Button
        title="Choose"
        onPress={params.onChooseLocation ? params.onChooseLocation : () => null}
      />
    );
    return {
      title: `${params.title}`,
      headerRight
    }
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    const newLatitude = this.props.navigation.state.params.location.coords.latitude;
    const newLongitude = this.props.navigation.state.params.location.coords.longitude;
    const newRegion = Object.assign({}, this.state.region, { longitude: newLongitude, latitude: newLatitude });
    this.setState({ region: newRegion });
    const newMarkerPosition = Object.assign({}, this.state.markerPosition, { longitude: newLongitude, latitude: newLatitude });
    this.setState({ markerPosition: newMarkerPosition });

    this.getAddress(newLatitude,newLongitude);
    console.log('WILL MOUNT LONG' + JSON.stringify(this.props.navigation.state.params.location.longitude));
  }

  componentDidMount() {
    this.setState({ mapReady: true });
    this.props.navigation.setParams({ onChooseLocation: this._onChooseLocation });
    console.log(this.state.mapReady);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(JSON.stringify(this.state.location));
  };

  getAddress = (latitude,longitude) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyA0yVsvTBpKV2jGAEkBCZFxc0muYqvilCo')
        .then((response) => response.json())
        .then((responseJson) => {
          let address = (JSON.stringify(responseJson['results'][0].address_components[1]['long_name'])).replace(/"/gi,'') + ' '
                       +(JSON.stringify(responseJson['results'][0].address_components[0]['long_name'])).replace(/"/gi,'') + ', '
                       +(JSON.stringify(responseJson['results'][0].address_components[5]['long_name'])).replace(/"/gi,'') + ', '
                       +(JSON.stringify(responseJson['results'][0].address_components[2]['long_name'])).replace(/"/gi,'');
          this.setState({ markerTitle: address });
          this.refs.marker.showCallout();
    })
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onMapPress = (e) => {
    try {
      let location = {
        latitude:  e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      }
      this.setState({markerPosition: location});
      this.getAddress(location.latitude,location.longitude);
      console.log(location);
    } catch (e) {
      console.log(e);
    }
  }

  onCalloutPress = (e) => {
    this._onChooseLocation();
  }

  _onChooseLocation = () => {
    this.props.navigation.state.params.receiveProps(this.props.navigation.state.params.screenName, this.state.markerTitle);
    this.props.navigation.goBack();
    console.log();
  }

  render() {
    if (!this.state.mapReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref='map'
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnabled={true}
          showsMyLocationButton={true}
          onPress={this.onMapPress}
        >
          <MapView.Marker
            ref='marker'
            style={{width: 300, height: 100}}
            tooltip={true}
            coordinate={this.state.markerPosition}
            title={this.state.markerTitle}
            onCalloutPress={this.onCalloutPress}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
