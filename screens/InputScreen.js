import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';


class InputScreen extends Component {
  state = {
    screenName: '',
    input: ''
  };

  componentDidMount() {
    this.setState({
      screenName: this.props.navigation.state.params.screenName,
      input: this.props.navigation.state.params.input,
    });
  }

  static navigationOptions =  {
    title: 'Input',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='receipt' />
    ),
  };

  onSubmit = () => {
    this.props.navigation.state.params.receiveProps(this.state.screenName, this.state.input);
    this.props.navigation.goBack();
  }

  render() {
    console.log(this.props.navigation.state.params.input);
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
         <FormLabel>{this.props.navigation.state.params.screenName}</FormLabel>
         <FormInput
          onChangeText={input => this.setState({ input })}
          value={this.state.input}
          selectTextOnFocus={true}
        />
        </View>
       <Button  onSubmitEditing={(event) => this.onSubmitHandler(event)} title="Submit"/>
      </View>
    );
  }
}
export default InputScreen
