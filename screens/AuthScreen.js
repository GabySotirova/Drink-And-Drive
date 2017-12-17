import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, Button } from 'react-native';


class AuthScreen extends Component {

  state = {
    phone: '+45',
  };

  onSubmit = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Phone:</FormLabel>
        <FormInput
         onChangeText={phone => this.setState({ phone })}
         value={this.state.phone}
        />
       <Button onPress={this.onSubmit} title="Submit" />
     </View>
    );
  }
}
export default AuthScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
