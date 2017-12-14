import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, Button } from 'react-native';
import Modal from 'react-native-modalbox';


class AuthScreen extends Component {

  state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
  };

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Modal
          style={styles.modal}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
            <Text>Basic modal</Text>
        </Modal>
      </View>
    );
  }
}
export default AuthScreen

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
