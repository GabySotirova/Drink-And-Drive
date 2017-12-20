import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

class SignUpForm extends Component {
  state = { phone: '' };

  componentWillMount() {
    //this.checkAuthProgress();
  }

  async checkAuthProgress() {
    try {
      const value = await AsyncStorage.getItem('authProgress');
      if (value == 'requestPassword'){
        console.log(value);
        //await AsyncStorage.removeItem('authProgress');
        //await AsyncStorage.removeItem('phone');
        this.props.navigation.navigate('SignInForm');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async () => {
    if (this.state.phone.length == 8 && !isNaN(this.state.phone)) {
      try {
        await axios.post(`${URL}/createUser`, { phone: this.state.phone });
        await axios.post(`${URL}/requestPassword`, { phone: this.state.phone });

        //await AsyncStorage.setItem('authProgress', 'requestPassword');
        //await AsyncStorage.setItem('phone', this.state.phone);
        this.props.navigation.navigate('SignInForm', { phone: this.state.phone });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a valid number");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
         <FormLabel>Enter Phone:</FormLabel>
         <FormInput
          placeholder={'e.g. 84635395'}
          onChangeText={phone => this.setState({ phone })}
        />
        </View>
       <Button onPress={this.onSubmit} title="Enter" />
      </View>
    );
  }
}
export default SignUpForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    marginBottom: 10
  }
});
