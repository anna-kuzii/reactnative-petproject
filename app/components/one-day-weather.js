// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    forecast: Object
};

export default class OneDayWeather extends Component<Props> {
    render() {
        const {forecast} = this.props;
        const {day, night} = forecast;

        return (
            <View style={styles.containerOuter}>
                <Text style={styles.narrative}>{day.narrative}</Text>
                <View style={styles.containerInner}>
                    <Text style={styles.header}>Day</Text>
                    <Text style={styles.header}>Night</Text>
                </View>
                <View style={styles.containerInner}>
                    <View style={styles.half}>
                        <View>
                            <Text>temperature: </Text>
                            <Text>wind speed: </Text>
                        </View>
                        <View>
                            <Text>
                                {day.temperature}
                                °C
                            </Text>
                            <Text>{day.windSpeed} km/h</Text>
                        </View>
                    </View>
                    <View style={styles.half}>
                        <View>
                            <Text>temperature: </Text>
                            <Text>wind speed: </Text>
                        </View>
                        <View>
                            <Text>
                                {night.temperature}
                                °C
                            </Text>
                            <Text>{night.windSpeed} km/h</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerOuter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerInner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    half: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'red',
        textAlign: 'center',
        flexBasis: '50%',
    },
    narrative: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 15,
    },
});
