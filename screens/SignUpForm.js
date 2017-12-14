import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

class SignUpForm extends Component {
  state = { phone: '' };

  onSubmit = async () => {
    if (this.state.phone.length == 8) {
      try {
        await axios.post(`${URL}/createUser`, { phone: this.state.phone });
        await axios.post(`${URL}/requestPassword`, { phone: this.state.phone });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Invalid number!")
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>Enter Phone Number</FormLabel>
         <FormInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        </View>
       <Button onPress={this.onSubmit} title="Submit" />
      </ScrollView>
    );
  }
}
export default SignUpForm
