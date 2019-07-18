//@flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const NONE_INDEX = 26;
const LOW_INDEX = 50;
const MODERATE_INDEX = 76;
const HIGH_INDEX = 90;

export type Chart = {
  index: number,
  title: string,
  type: string,
  icon: string,
  category?: string,
};

type Props = {
  chartData: Array<Chart>,
  size?: number,
};

export default class CircularCharts extends Component<Props> {
  getColor(index: number): string {
    switch (true) {
      case index < NONE_INDEX:
        return '#308020';
      case index < LOW_INDEX:
        return '#78C810';
      case index < MODERATE_INDEX:
        return '#E8C818';
      case index < HIGH_INDEX:
        return '#E88010';
      default:
        return '#E82808';
    }
  }

  render() {
    const { chartData, size = 90 } = this.props;

    return (
      <View style={styles.container}>
        {chartData.map((chart: Chart) => (
          <View style={styles.wrapper} key={chart.type}>
            <Text style={styles.title}>{chart.title}</Text>
            <AnimatedCircularProgress
              size={size}
              width={5}
              fill={chart.index}
              rotation={180}
              tintColor={this.getColor(chart.index)}
              backgroundColor="#ccc"
            >
              {() => (
                <Text style={styles.icon}>
                  <Icon name={chart.icon} size={36} />
                </Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.title}>
              {chart.category && chart.category.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
  },
});
