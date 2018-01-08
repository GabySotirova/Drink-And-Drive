import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';

export default class StatusScreen extends React.Component {

  state = {
    progress: 0.25,
    progressText: 'Order Received'
  }

  static navigationOptions = {
    title: 'Status',
    headerTitleStyle: {color: '#FFD500', fontWeight: 'bold'},
    headerStyle: {
      backgroundColor: '#262626',
    },
    tabBarIcon: ({ tintColor }) => (
    <Icon
      name='timelapse'
      color='#FFD500'
    />
    ),
  };

  componentDidUpdate() {
    this.setState({
      progress: 0.25,
      progressText: 'Order received',
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Progress.Circle ref='circle' color='#FFD500' progress={this.state.progress} size={200} thickness={15}/>
        <Text style={styles.progress}>25%</Text>
        <Text style={styles.text}>{this.state.progressText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  progress: {
    fontSize: 32,
    color: '#FFD500'
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
});
