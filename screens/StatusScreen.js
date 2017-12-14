import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';

export default class StatusScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Status',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='timelapse' />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Status Screen</Text>
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
