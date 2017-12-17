import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, Platform, TouchableWithoutFeedback } from 'react-native';
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
      errorMessage: null,
      addressSubtitle: null,
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

  //Get data from child components
  receiveProps = (sender, val) => {
    if (sender == 'Address') {
      const newAddress = Object.assign({}, this.state.address, { subtitle: val });
      this.setState({ address: newAddress });
    }
    if (sender == 'Customer') {
      const newCustomer = Object.assign({}, this.state.customer, { subtitle: val });
      this.setState({ customer: newCustomer });
    }
    if (sender == 'Destination') {
      const newDestination = Object.assign({}, this.state.destination, { subtitle: val });
      this.setState({ destination: newDestination });
    }
    if (sender == 'Comment') {
      const newComment = Object.assign({}, this.state.comment, { subtitle: val });
      this.setState({ comment: newComment });
    }
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
          let address = (JSON.stringify(responseJson['results'][0].address_components[1]['long_name'])).replace(/"/gi,'') + ' '
                       +(JSON.stringify(responseJson['results'][0].address_components[0]['long_name'])).replace(/"/gi,'') + ', '
                       +(JSON.stringify(responseJson['results'][0].address_components[5]['long_name'])).replace(/"/gi,'') + ', '
                       +(JSON.stringify(responseJson['results'][0].address_components[2]['long_name'])).replace(/"/gi,'');
          let location = address.replace(/"/gi,'');
          const newAddress = Object.assign({}, this.state.address, { subtitle: location });
          this.setState({ address: newAddress });
          console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson['results'][0].formatted_address));
    })
  }

  onSubmit = () => {
    console.log(!isNaN('123'));
  }

  onPressAddress = () => {
    BottomSheet.showBottomSheetWithOptions({
      options: ['Input Address', 'Current Location', 'Choose from Map', 'Cancel'],
      title: 'Address Options',
      dark: true,
      cancelButtonIndex: 3,
    }, (value) => {
      if (value == 0) {
        this.props.navigation.navigate('Input',
        { input: this.state.address.subtitle, screenName: 'Address', receiveProps: this.receiveProps });
      }
      if (value == 1) {
        this._getLocationAsync();
      }
      if (value == 2) {
        this.props.navigation.navigate('MapScreen',
        { title: 'Map', screenName: 'Address', location: this.state.location, receiveProps: this.receiveProps });
      }
    });
  }

  onPressTime= () => {
    this._showDateTimePicker();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date);
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
        this.props.navigation.navigate('Input',
        { screenName: 'Customer', receiveProps: this.receiveProps });
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
        this.props.navigation.navigate('Input',
        { input: this.state.destination.subtitle,screenName: 'Destination', receiveProps: this.receiveProps });
      }
      if (value == 1) {
        this.props.navigation.navigate('MapScreen',
        { title: 'Map', screenName: 'Destination', location: this.state.location, receiveProps: this.receiveProps });
      }
    });
  }

  onPressComment = () => {
        this.props.navigation.navigate('Input',
        { input: this.state.comment.subtitle, screenName: 'Comment', receiveProps: this.receiveProps });
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
            subtitle={this.state.comment.subtitle}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressComment}
          />

          <TouchableWithoutFeedback>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              minimumDate={new Date()}
              mode={'datetime'}
            />
          </TouchableWithoutFeedback>

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
