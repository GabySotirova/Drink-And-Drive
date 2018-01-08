import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Icon, FormLabel, FormInput } from 'react-native-elements';
import firebase from 'firebase';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import { StackNavigator } from 'react-navigation';
import ProfileForm from './ProfileForm';

const ProfileNavigator = StackNavigator({
    SignUpForm: {
      screen: SignUpForm,
    },
    SignInForm: {
      screen: SignInForm,
    },
    ProfileForm: {
      screen: ProfileForm,
    }
    },
    {
     headerMode: 'none',
     navigationOptions: {
        gesturesEnabled: false
     }
   }
);

export default class ProfileScreen extends React.Component {
  state = {
      user: null,
  };

  static navigationOptions = {
    title: 'Authenticate',
    headerTitleStyle: {color: '#FFD500', fontWeight: 'bold'},
    headerStyle: {
      backgroundColor: '#262626',
    },
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='account-circle'
      color='#FFD500'
     />
    ),
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;

    if (user !== null) {
      this.props.navigation.navigate('ProfileForm');
    } else {
      this.props.navigation.navigate('SignUpForm');
    }
  }

  render() {
    return(
      <ProfileNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
