import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import HourlyWeather from '../components/hourly-weather';
import * as api from '../api/api';

export default class Hourly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getHourlyForecast();
  }

  getHourlyForecast() {
    const { geocode } = this.props.location;

    api
      .getForecast({ geocode, type: 'hourly' })
      .then(forecast => {
        this.setState(() => ({
          forecast,
        }));
      })
      .catch(error => {
        alert('error');
        console.log(error);
      });
  }

  render() {
    const { city } = this.props.location;

    return (
      <View>
        <Text style={styles.city}>{city.toUpperCase()}</Text>
        {this.state.forecast && (
          <HourlyWeather
            feelsLike={this.state.forecast.feelsLike}
            temperature={this.state.forecast.temperature}
            phrase={this.state.forecast.phrase}
            processTime={this.state.forecast.processTime}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  city: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

Hourly.propTypes = {
  location: PropTypes.object,
};
