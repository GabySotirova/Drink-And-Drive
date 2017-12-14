import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
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
    errorMessage: null
  }

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
    console.log('WILL MOUNT LONG' + JSON.stringify(this.props.navigation.state.params.location.longitude));
  }

  componentDidMount() {
    this.setState({ mapReady: true });
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

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onMapPress = (e) => {
    let location = {
      latitude:  e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    }
    this.setState({markerPosition: location})
    console.log(location);
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
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnabled={true}
          showsMyLocationButton={true}
          onPress={this.onMapPress}
          provider="google"
        >
          <MapView.Marker
              coordinate={this.state.markerPosition}
              title="Selected location"
              onLoad={() => this.forceUpdate()}
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
