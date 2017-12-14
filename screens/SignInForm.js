import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

class SignInForm extends Component {
  state = { phone: '', code: '' };

  onSubmit = async () => {
    try {
      let { data } = await axios.post(`${URL}/verifyPassword`, {
        phone: this.state.phone, code: this.state.code
      });

      firebase.auth().signInWithCustomToken(data.token);
      console.log(data.token);
      Alert.alert('Authentication is successfull!');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>Enter Phone Number</FormLabel>
         <FormInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
         />
        </View>

        <View style={{ marginBottom: 10 }}>
         <FormLabel>Enter Code</FormLabel>
         <FormInput
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
         />
        </View>

       <Button onPress={this.onSubmit} title="Submit" />
      </View>
    );
  }
}
export default SignInForm
