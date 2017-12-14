import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListView, List, ListItem, Icon, FormLabel, FormInput, Button } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import firebase from 'firebase';
import BottomSheet from 'react-native-bottomsheet';
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class OrderScreen extends React.Component {

  state = {
    address: {
        title: 'Address',
        icon: 'av-timer',
        subtitle: 'Fetching your location ...'
      },
      time: {
        title: 'Pick-up Time',
        icon: 'flight-takeoff',
        subtitle: ''
      },
      customer: {
        title: 'Customer',
        subtitle: ''
      },
      destination: {
        title: 'Destination',
        subtitle: ''
      },
      comment: {
        title: 'Comment',
        subtitle: ''
      },
      isDateTimePickerVisible: false,
      location: null,
      errorMessage: null
  };

  static navigationOptions = {
    title: 'Order',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='receipt' />
    ),
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Emulator detected!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  //receive props from child components
  receiveProps = (child, ) => {
    this.setState({
      location: val
    });
    console.log('Receive props' + val);
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
    this.getAddress();
  };

  getAddress = () => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.location.coords.latitude + ',' + this.state.location.coords.longitude + '&key=' + 'AIzaSyA0yVsvTBpKV2jGAEkBCZFxc0muYqvilCo')
        .then((response) => response.json())
        .then((responseJson) => {
          let location = JSON.stringify(responseJson['results'][0].formatted_address);
          const newAddress = Object.assign({}, this.state.address, { subtitle: location });
          this.setState({ address: newAddress });
          console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson['results'][0].formatted_address));
    })
  }

  onSubmit = () => {

  }

  onPressAddress = () => {
    BottomSheet.showBottomSheetWithOptions({
      options: ['Input Address', 'Current Location', 'Choose from Map', 'Cancel'],
      title: 'Address Options',
      dark: true,
      cancelButtonIndex: 3,
    }, (value) => {
      if (value == 0) {
        this.props.navigation.navigate('Input', {screenName: 'Address', receiveProps: this.receiveProps});
      }
      if (value == 1) {
        this._getLocationAsync();
      }
      if (value == 2) {
        this.props.navigation.navigate('MapScreen', { location: this.state.location });
      }
    });
  }

  onPressTime= () => {
    this._showDateTimePicker();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
   this.state.time.subtitle = date.toString();
   this._hideDateTimePicker();
  };

  onPressCustomer = () => {
    BottomSheet.showBottomSheetWithOptions({
      options: ['Input Details', 'Get from my Profile', 'Cancel'],
      title: 'Customer Options',
      dark: true,
      cancelButtonIndex: 2,
    }, (value) => {
      if (value == 0) {
        this.props.navigation.navigate('Input', {screenName: 'Customer', receiveProps: this.receiveProps});
      }
      if (value == 1) {
        this._getProfileData();
      }
    });
  }

  onPressDestination = () => {
    BottomSheet.showBottomSheetWithOptions({
      options: ['Input Destination', 'Choose from Map', 'Cancel'],
      title: 'Destination Options',
      dark: true,
      cancelButtonIndex: 2,
    }, (value) => {
      if (value == 0) {
        this.props.navigation.navigate('Input', {screenName: 'Destination', receiveProps: this.receiveProps});
      }
      if (value == 1) {
        this.props.navigation.navigate('MapScreen', { location: this.state.location });
      }
    });
  }

  onPressComment = () => {
      if (value == 0) {
        this.props.navigation.navigate('Input', {screenName: 'Comment', receiveProps: this.receiveProps});
      }
    };

  render() {
    return (
      <View>
        <List>
          <ListItem
            title={this.state.address.title}
            subtitle={this.state.address.subtitle}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressAddress}
          />
          <ListItem
            title={this.state.time.title}
            subtitle={this.state.time.subtitle}
            leftIcon={{name:this.state.time.icon}}
            onPress={this.onPressTime}
          />
          <ListItem
            title={this.state.customer.title}
            subtitle={this.state.customer.subtitle}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressCustomer}
          />
          <ListItem
            title={this.state.destination.title}
            subtitle={this.state.destination.subtitle}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressDestination}
          />
          <ListItem
            title={this.state.comment.title}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressComment}
          />

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            minimumDate={new Date()}
            mode={'datetime'}
          />

        </List>

        <Button style={styles.button} onPress={this.onSubmit} title="Order" />
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
  button: {
    marginTop: 10,
  }
});
