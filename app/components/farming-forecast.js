import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export type LevelMoisture = {
  level: number,
  description: string,
};
type Props = {
  date: string,
  validDate?: string,
  temp: number,
  img?: string,
  moistureLevel: LevelMoisture,
};

export default class FarmingForecast extends Component<Props> {
  render() {
    return (
      <View style={styles.farmingBlock}>
        <View>
          <Text style={styles.farmingDate}>{this.props.date}</Text>
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Accumulation</Text>
        </View>
        <View>
          <Text style={styles.temp}>{this.props.temp} cm</Text>
        </View>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: this.props.img }}
          />
          <Text />
        </View>
        <View>
          {[6, 5, 4, 3, 2, 1].map(i => (
            <View
              key={i}
              style={
                i <= this.props.moistureLevel.level
                  ? styles.wave
                  : styles.waveGray
              }
            />
          ))}
        </View>
        <View style={styles.moistureDescription}>
          <Text style={styles.moistureDescriptionText}>
            {this.props.moistureLevel.description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  farmingBlock: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  titleWrap: {
    paddingLeft: 3,
    paddingRight: 3,
    },
  title: {
    fontSize: 12,
    },
  farmingDate: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    fontSize: 14,
  },
  moistureDescription: {
    marginTop: 5,
    width: 70,
    height: 70,
    flexWrap: 'wrap',
  },
  temp: {
     fontSize: 12,
    },

    moistureDescriptionText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 12,

    },
  wave: {
    backgroundColor: 'blue',
    width: 40,
    height: 5,
    marginBottom: 2,
  },
  waveGray: {
    backgroundColor: 'gray',
    width: 40,
    height: 5,
    marginBottom: 2,
  },
});
