import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class InputScreen extends Component {
  state = {
    input: ''
  };

  onSubmit = () => {

  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>{this.props.navigation.state.params.input}</FormLabel>
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
