import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class InfoButton extends Component {
  render() {
    return (
      <View style={styles.viewInfoBtn}>
        <Text style={styles.textInfoBtn}>i</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewInfoBtn: {
    width: 25,
    height: 25,
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  textInfoBtn: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#fff',
    fontWeight: 'bold',
  },
});
