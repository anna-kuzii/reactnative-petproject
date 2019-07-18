import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  level: number,
  description: string,
};
export default class Moisture extends Component<Props> {
  render() {
    return (
      <View style={styles.moistureIconsOne}>
        <View style={styles.moistureWaves}>
          {[6, 5, 4, 3, 2, 1].map(i => (
            <View
              key={i}
              style={i <= this.props.level ? styles.wave : styles.waveGray}
            />
          ))}
        </View>
        <View style={styles.description}>
          <Text>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInfoBtn: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#fff',
    fontWeight: 'bold',
  },
  moistureIconsOne: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 5,
    marginRight: 5,
  },
  moistureWaves: {
    marginRight: 5,
  },
  wave: {
    backgroundColor: 'blue',
    width: 50,
    height: 5,
    marginBottom: 2,
  },
  waveGray: {
    backgroundColor: 'gray',
    width: 50,
    height: 5,
    marginBottom: 2,
  },
  description: {
    width: '55%',
  },
});
