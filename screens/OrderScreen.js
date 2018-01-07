import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, Platform, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
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
        icon: 'my-location',
        subtitle: 'Fetching your location ...'
      },
      time: {
        title: 'Pick-up Time',
        icon: 'access-time',
        subtitle: ''
      },
      customer: {
        title: 'Customer phone',
        icon: 'perm-identity',
        subtitle: ''
      },
      destination: {
        title: 'Destination',
        icon: 'location-on',
        subtitle: ''
      },
      comment: {
        title: 'Comment',
        icon: 'comment',
        subtitle: ''
      },
      isDateTimePickerVisible: false,
      location: null,
      errorMessage: null,
      addressSubtitle: null,
  };

  static navigationOptions = {
    title: 'Drink & Drive',
    headerTitleStyle: {color: '#FFD500', fontWeight: 'bold'},
    headerStyle: {
      backgroundColor: '#262626',
    },
    tabBarIcon: ({ tintColor }) => (
      <Icon
      name='receipt'
      color='#FFD500' />
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
        { input: this.state.customer.subtitle, screenName: 'Customer', receiveProps: this.receiveProps });
      }
      if (value == 1) {
        this.getProfileData();
      }
    });
  }

  getProfileData = async () => {

    let user = firebase.auth().currentUser;

    if (user !== null) {
      try {
        const value = await AsyncStorage.getItem('userPhone');
        if (value !== null){
          let phone = value;
          const newCustomer = Object.assign({}, this.state.customer, { subtitle: phone });
          this.setState({ customer: newCustomer });
        } else {
          this.props.navigation.navigate('Profile');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.props.navigation.navigate('Profile');
    }
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

  onSubmit = () => {
    if (this.state.customer.subtitle.length > 0) {
      this.makeOrder(
        this.state.address.subtitle,
        this.state.time.subtitle,
        this.state.customer.subtitle,
        this.state.destination.subtitle,
        this.state.comment.subtitle
      );
      alert('Your order has been made')
    } else {
      alert('Please enter customer credentials');
    }
  }

  makeOrder(address, time, customer, destination, comment) {
    firebase.database().ref('orders/' + customer).set({
      address: address,
      time: time,
      destination: destination,
      comment: comment
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <List containerStyle={styles.list} >
          <ListItem
            containerStyle={styles.listItem}
            title={this.state.address.title}
            titleStyle={{color: 'white'}}
            subtitle={this.state.address.subtitle}
            leftIcon={{name:this.state.address.icon}}
            onPress={this.onPressAddress}
          />
          <ListItem
            containerStyle={styles.listItem}
            title={this.state.time.title}
            titleStyle={{color: 'white'}}
            subtitle={this.state.time.subtitle}
            leftIcon={{name:this.state.time.icon}}
            onPress={this.onPressTime}
          />
          <ListItem
            containerStyle={styles.listItem}
            title={this.state.customer.title}
            titleStyle={{color: 'white'}}
            subtitle={this.state.customer.subtitle}
            leftIcon={{name:this.state.customer.icon}}
            onPress={this.onPressCustomer}
          />
          <ListItem
            containerStyle={styles.listItem}
            title={this.state.destination.title}
            titleStyle={{color: 'white'}}
            subtitle={this.state.destination.subtitle}
            leftIcon={{name:this.state.destination.icon}}
            onPress={this.onPressDestination}
          />
          <ListItem
            containerStyle={styles.listItem}
            title={this.state.comment.title}
            titleStyle={{color: 'white'}}
            subtitle={this.state.comment.subtitle}
            leftIcon={{name:this.state.comment.icon}}
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

        <Button
          style={styles.button}
          onPress={this.onSubmit}
          backgroundColor='#FFC108'
          color='#545454'
          fontWeight='bold'
          title="Order"
          borderRadius={30}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
  },
  list: {
    backgroundColor: '#1B1B1B',
    borderColor: '#1B1B1B'
  },
  button: {
    backgroundColor: '#FFD500',
    marginTop: 30,
    borderRadius: 30,
  },
  listItem: {
    borderBottomColor: '#545454',
  }
});
