import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
  }

  onPress = () => {
    
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

       <Button onPress={this.onSubmit} title="Save" />
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
