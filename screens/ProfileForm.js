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
    title: 'Profile',
    headerTitleStyle: {color: '#FFD500', fontWeight: 'bold'},
    headerStyle: {
      backgroundColor: '#262626',
    },
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='account-circle'
      color='#FFD500'
     />
    ),
  };

  componentDidMount() {
    this.setState({ phone: this.props.navigation.state.params.phone });
    this.fetchInformation();
    this.onSave();
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
      this.fetchInformation();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>

         <FormLabel labelStyle={{color: 'white'}}>Name:</FormLabel>
         <FormInput
          inputStyle={styles.input}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder={'John Smith'}
         />

         <FormLabel labelStyle={{color: 'white'}}>Phone:</FormLabel>
         <FormInput
          inputStyle={styles.input}
          value={this.state.phone}
         />

         <FormLabel labelStyle={{color: 'white'}}>Home address:</FormLabel>
         <FormInput
          inputStyle={styles.input}
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
          placeholder={'Danmarksgade 63, 9000, Aalborg'}
         />
       </View>

       <Button style={styles.button}
         onPress={this.onSave}
         backgroundColor='#FFC108'
         color='#545454'
         fontWeight='bold'
         title="Save"
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
