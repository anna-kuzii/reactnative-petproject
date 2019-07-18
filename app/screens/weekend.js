// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  location: {
    geocode: string,
    city: string,
  },
};

export default class WeekendScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Geocode {this.props.location.geocode}</Text>
        <Text>City {this.props.location.city}</Text>
        <Text>Weekend weather will be here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
