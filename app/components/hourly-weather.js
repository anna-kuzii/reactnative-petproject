import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  formatDay,
  formatMonth,
  getTimeFromISOFormat,
  getDateFromISOFormat,
} from '../utils/utils';

export default class HourlyWeather extends Component {
  sectionList() {
    const { feelsLike, temperature, phrase, processTime } = this.props;

    const sections = [];

    for (let i = 0; i < processTime.length; ++i) {
      const title = getDateFromISOFormat(processTime[i]);

      let section = sections.find(item => {
        return title === item.title;
      });

      let sectionInfo = {
        date: processTime[i],
        temp: temperature[i],
        feel: feelsLike[i],
        phrase: phrase[i],
      };

      if (!section) {
        sections.push({
          title: title,
          data: [sectionInfo],
        });
      } else {
        section.data.push(sectionInfo);
      }
    }
    return sections;
  }

  render() {
    return (
      <SectionList
        stickySectionHeaderEnabled={true}
        sections={this.sectionList()}
        renderSectionHeader={({ section }) => (
          <Text style={styles.SectionHeaderStyle}>
            {formatDay(section.title)}, {formatMonth(section.title)}{' '}
            {new Date(section.title).getDate()}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.SectionBlock}>
            <Text style={styles.hourText}> {getTimeFromISOFormat(item)} </Text>
            <Text style={styles.SectionListItemStyle}>
              <Text style={styles.boldText}>Temperature</Text> {item.temp}
            </Text>
            <Text style={styles.SectionListItemStyle}>
              <Text style={styles.boldText}>Feels like:</Text> {item.feel}
            </Text>
            <Text style={styles.SectionListItemStyle}> {item.phrase} </Text>
          </View>
        )}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

const styles = StyleSheet.create({
  hourText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    padding: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  SectionBlock: {
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 2,
  },
  SectionHeaderStyle: {
    backgroundColor: '#cddc39',
    fontSize: 25,
    padding: 5,
    color: '#fff',
  },
  SectionListItemStyle: {
    fontSize: 20,
    padding: 5,
  },
});

HourlyWeather.propTypes = {
  feelsLike: PropTypes.array,
  temperature: PropTypes.array,
  phrase: PropTypes.array,
  processTime: PropTypes.array,
};
