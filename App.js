import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import StatusScreen from './screens/StatusScreen';
import InputScreen from './screens/InputScreen';
import MapScreen from './screens/MapScreen';


const TabNav = TabNavigator({
  Order: {
    screen: OrderScreen,
  },
  Status: {
    screen: StatusScreen,
  },
  Profile: {
    screen: ProfileScreen
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

const StackNav = StackNavigator({
  TabNav: {
    screen: TabNav,
  },
  Input: {
    screen: InputScreen,
  },
  MapScreen: {
    screen: MapScreen,
  },
});

export default class App extends React.Component {

  componentDidMount() {
    var config = {
     apiKey: "AIzaSyAZzqPWgp3AfMfnYOS9_TPofwfBT716Qrk",
     authDomain: "drink-and-drive.firebaseapp.com",
     databaseURL: "https://drink-and-drive.firebaseio.com",
     projectId: "drink-and-drive",
     storageBucket: "drink-and-drive.appspot.com",
     messagingSenderId: "943601859777"
    };

    firebase.initializeApp(config);
    console.log('Start')
  }

  render() {
    return (
      <StackNav />
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
