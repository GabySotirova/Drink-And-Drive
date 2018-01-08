import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class InputScreen extends Component {
  state = {
    screenName: '',
    input: ''
  };

  static navigationOptions = {
    title: 'Input',
    headerTitleStyle: {color: '#FFD500', fontWeight: 'bold'},
    headerStyle: {
      backgroundColor: '#262626',
    },
    headerTintColor: '#FFD500'
  };

  componentDidMount() {
    this.setState({
      screenName: this.props.navigation.state.params.screenName,
      input: this.props.navigation.state.params.input,
    });
  }

  onSubmit = () => {
    this.props.navigation.state.params.receiveProps(this.state.screenName, this.state.input);
    this.props.navigation.goBack();
  }

  render() {
    console.log(this.props.navigation.state.params.input);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
         <FormLabel labelStyle={{color: 'white'}}>{this.props.navigation.state.params.screenName}</FormLabel>
         <FormInput
          inputStyle={styles.input}
          onChangeText={input => this.setState({ input })}
          value={this.state.input}
          selectTextOnFocus={true}
        />
        </View>
        <Button
          style={styles.button}
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
export default InputScreen
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
