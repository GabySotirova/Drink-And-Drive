import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text } from 'react-native';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Icon, FormLabel, FormInput } from 'react-native-elements';
import firebase from 'firebase';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

export default class ProfileScreen extends React.Component {

  state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
  };

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  static navigationOptions = {
    tabBarLabel: 'Profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='account-circle' />
    ),
  };

  componentDidMount() {
    var user = firebase.auth().currentUser;

      if (user == null) {
        console.log(user);
        this.refs.modal1.open();
      } else {
        // No user is signed in.
      }
  }

  render() {
    return(
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
          <Button onPress={() => this.refs.modal1.close()} style={styles.btnModal}>X</Button>
          <KeyboardAvoidingView style={{ marginBottom: 10 }, { marginTop: 20 }}>
            <FormLabel>Enter Phone Number</FormLabel>
            <FormInput />
          </KeyboardAvoidingView>
        </Modal>

        <Button onPress={() => this.refs.modal1.open()}>Basic modal</Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  btnModal: {
   position: 'absolute',
   top: 10,
   right: 10,
   width: 50,
   height: 50,
   bottom: 10,
   backgroundColor: "transparent"
  },
  signinform: {
    position: 'absolute',
    marginTop: 20
  },

});
