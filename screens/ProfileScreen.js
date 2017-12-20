import React, { Component } from 'react';
<<<<<<< HEAD
import { KeyboardAvoidingView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
=======
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
>>>>>>> acfe0616bd384a354c38d2d7c4e814cef6638bfd
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'firebase';
<<<<<<< HEAD
import Modal from 'react-native-modal';
=======
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import { StackNavigator } from 'react-navigation';
import ProfileForm from './ProfileForm';
>>>>>>> acfe0616bd384a354c38d2d7c4e814cef6638bfd

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
<<<<<<< HEAD
       isModalVisible: false
  };

  /*onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }*/

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

=======
      user: null,
  };

>>>>>>> acfe0616bd384a354c38d2d7c4e814cef6638bfd
  static navigationOptions = {
    tabBarLabel: 'Profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='account-circle' />
    ),
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;

<<<<<<< HEAD
      if (user == null) {
        console.log(user);
      } else {
        // No user is signed in.
      }
=======
    if (user !== null) {
      this.props.navigation.navigate('ProfileForm');
    } else {
      this.props.navigation.navigate('SignUpForm');
    }
>>>>>>> acfe0616bd384a354c38d2d7c4e814cef6638bfd
  }

  render() {
    return(
<<<<<<< HEAD
      /*<View style={styles.container}>
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

      </View>*/

      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Button onPress={() => this._hideModal()} style={styles.btnModal}>X</Button>
          </View>
          <View style={{ flex: 2 }}>
            <FormLabel style={styles.formLabel}>Enter Phone Number</FormLabel>
            <FormInput />
          </View>
          <View style={{ flex: 3 }}>
          <Button onPress={this.onSubmit} style={styles.btnModalSubmit} title="Submit"></Button>
          </View>
        </Modal>
      </View>
=======
      <ProfileNavigator />
>>>>>>> acfe0616bd384a354c38d2d7c4e814cef6638bfd
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
  btnModalSubmit: {

  },
  signinform: {
    position: 'absolute',
    marginTop: 20
  },
});

//   if (this.state.user == null) {
//     return( <SignUpForm /> );
//   } else if (this.state.user == null && this.state.authProgress == 'requestPassword') {
//     return( <SignInForm /> );
//   }
// }

// <View style={styles.container}>
//   <Modal
//     style={styles.modal}
//     ref={"modal1"}
//     swipeToClose={this.state.swipeToClose}
//     onClosed={this.onClose}
//     onOpened={this.onOpen}
//     onClosingState={this.onClosingState}>
//     <Button onPress={() => this.refs.modal1.close()} style={styles.btnModal}>X</Button>
//     <KeyboardAvoidingView style={{ marginBottom: 10 }, { marginTop: 20 }}>
//       <FormLabel>Enter Phone Number</FormLabel>
//       <FormInput />
//     </KeyboardAvoidingView>
//   </Modal>
//
//   <Button onPress={() => this.refs.modal1.open()}>Basic modal</Button>
//
// </View>
