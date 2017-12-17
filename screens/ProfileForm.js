import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';

export default class ProfileForm extends React.Component {
  state = {
    name: '',
    phone: '',
    address: ''
  }

  static navigationOptions = {

  };

  componentDidMount() {
    this.setState({ phone: this.props.navigation.state.params.phone });
    this.fetchInformation();
  }

  fetchInformation = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log(key + ' ' + value);
        });
      });
    });
  }

  onSave = async () => {
    try {
      await AsyncStorage.multiSet([['userName', this.state.name], ['userPhone', this.state.phone], ['userAddress', this.state.address]]);
      alert('Saved');
      this.fetchInformation();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>

         <FormLabel>Name:</FormLabel>
         <FormInput
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder={'John Smith'}
         />

         <FormLabel>Phone:</FormLabel>
         <FormInput
          value={this.state.phone}
         />

         <FormLabel>Home address:</FormLabel>
         <FormInput
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
          placeholder={'Danmarksgade 63, 9000, Aalborg'}
         />
       </View>

       <Button onPress={this.onSave} title="Save" />
      </View>
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
