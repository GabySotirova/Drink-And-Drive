import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text } from 'react-native';
import { FormLabel, FormInput, Button, AsyncStorage } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

export default class SignInForm extends Component {
  state = {
    phone: '',
    code: ''
  }

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
      <View style={styles.container}>
        <View style={styles.form}>
         <FormLabel labelStyle={{color: 'white'}}>Enter Code:</FormLabel>
         <FormInput
          style={{placeholderColor: 'white'}}
          inputStyle={styles.input}
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
          placeholder={'e.g. 3771'}
         />
       </View>

       <Button style={styles.button}
         onPress={this.onSubmit}
         backgroundColor='#FFC108'
         color='#545454'
         fontWeight='bold'
         title="Enter"
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
  form: {
    marginBottom: 10,
    borderBottomColor: '#545454'
  },
  input: {
    color: '#545454',
  },
  button: {
    backgroundColor: '#FFD500',
    marginTop: 30,
    borderRadius: 30,
  },
});
