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
    tabBarLabel: 'Profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='account-circle' />
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
