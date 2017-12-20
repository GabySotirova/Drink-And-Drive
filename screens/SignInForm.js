import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { FormLabel, FormInput, Button, AsyncStorage } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

class SignInForm extends Component {
  state = { phone: '', code: '' };

  componentWillMount() {
    //this.getPhone();
    this.setState({ phone: this.props.navigation.state.params.phone });
  }

  async getPhone() {
    try {
      const value = await AsyncStorage.getItem('phone');
      if (value !== null){
        this.setState({ phone: value });
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async () => {
    try {
      let { data } = await axios.post(`${URL}/verifyPassword`, {
        phone: this.state.phone, code: this.state.code
      });

      firebase.auth().signInWithCustomToken(data.token);
      console.log(data.token);
      Alert.alert('Authentication is successfull!');
      this.props.navigation.navigate('ProfileForm', { phone: this.state.phone });
    } catch (error) {
      console.log(error);
    }
  }

  onBack = () => {
    //this.clearStorage();
    this.props.navigation.goBack();
  }

  async clearStorage() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>Enter Code:</FormLabel>
         <FormInput
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
          placeholder={'e.g. 3771'}
         />
       </View>

       <Button onPress={this.onSubmit} title="Enter" />
       <Button style={{marginTop: 10, backgroundColor: "transparent"}} title="Back" onPress={this.onBack} />

      </View>
    );
  }
}
export default SignInForm
