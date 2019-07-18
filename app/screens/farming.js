// @flow
import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import MoistureInfo from '../components/moisture-info';
import FarmingForecast from '../components/farming-forecast';
import connect from 'react-redux/es/connect/connect';

export type LevelMoisture = {
  level: number,
  description: string,
};
export type FarmingWeather = {
  date: string,
  validDate?: string,
  temp: number,
  img?: string,
  moistureLevel: LevelMoisture,
};

type Props = {
  weatherDataDay: Array<FarmingWeather>,
  location: {
    geocode: string,
    city: string,
  },
};

export class Farming extends Component<{}, Props> {
  render() {
    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: 'https://s.w-x.co/lifestyle-farming-bg.png' }}
        >

        <ScrollView>
        <View
          style={{
            position: 'relative',
          }}
        >
          <MoistureInfo />
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showhorizontalscrollIndicator={true}
        >
          <View style={styles.view}>
            {this.props.weatherDataDay.slice(0, 5).map(item => (
              <FarmingForecast
                key={item.date}
                date={item.date}
                temp={item.temp}
                moistureLevel={item.moistureLevel}
                img={
                  'https://cdn4.iconfinder.com/data/icons/stroke-weather-and-forecast/64/weather_cloud_cloudy-512.png'
                }
              />
            ))}
          </View>
          <View style={styles.view}>
            {this.props.weatherDataDay.slice(5, 10).map(item => (
              <FarmingForecast
                key={item.date}
                date={item.date}
                temp={item.temp}
                moistureLevel={item.moistureLevel}
                img={
                  'https://cdn4.iconfinder.com/data/icons/stroke-weather-and-forecast/64/weather_sun_sunny_day-512.png'
                }
              />
            ))}
          </View>
          <View style={styles.view}>
            {this.props.weatherDataDay.slice(10, 15).map(item => (
              <FarmingForecast
                key={item.date}
                date={item.date}
                temp={item.temp}
                moistureLevel={item.moistureLevel}
                img={
                  'https://cdn4.iconfinder.com/data/icons/stroke-weather-and-forecast/64/weather_cloud_cloudy-512.png'
                }
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        minHeight: '100%',
    },
    view: {
        width: Dimensions.get('window').width,
        padding: 5,
        paddingTop: 25,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
});

const mapStateToProps = state => ({
  weatherDataDay: state.farming.farmingData,
});

export default connect(mapStateToProps)(Farming);
