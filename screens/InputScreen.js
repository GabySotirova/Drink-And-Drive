import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class InputScreen extends Component {
  state = {
    screenName: '',
    input: ''
  };

  onSubmit = () => {
    this.props.navigation.state.params.receiveProps(this.state.input);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>{this.props.navigation.state.params.screenName}</FormLabel>
         <FormInput
          onChangeText={input => this.setState({ input })}
        />
        </View>
       <Button onPress={this.onSubmit} title="Submit" />
      </View>
    );
  }
}
export default InputScreen
