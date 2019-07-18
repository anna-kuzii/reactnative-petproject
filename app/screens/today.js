// @flow
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OneDayWeather from '../components/one-day-weather';
import { fetchDailyForecast } from "../redux/actions/daily-forecast";
import { dateChosen, toggleCalendar } from "../redux/actions/today";
import {
    getChosenDate,
    selectForecastFetchingState,
    selectlocation,
    selectOneDayForecast
} from "../redux/reducers/today/today";
import { createDateString } from '../utils/utils';

const daysPerWeek = 7;

type Props = {
    data: {
        forecast: Object,
        fetchingState: Object
    },
    location: {
        geocode: string,
        city: string,
    },
    chosenDate: number,
    calendarShowed: boolean,
    expirationTime: number,
    fetchDailyForecast: () => void,
    showHideCalendar: () => void,
    changeDate: (date: number) => void
};

class Today extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.choseDay = this.choseDay.bind(this);
    }

    componentDidMount() {
        const {data: {fetchingState: {loading, loaded}}, fetchForecast, expirationTime} = this.props;
        !loading && !loaded && fetchForecast();
        expirationTime && (expirationTime < Date.now()) && fetchForecast();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.geocode !== prevProps.location.geocode) {
            this.props.fetchForecast();
        }
    }

    choseDay = (day: Object) => {
        const {changeDate, expirationTime, fetchForecast} = this.props;
        changeDate(day.timestamp);
        expirationTime && (expirationTime < Date.now()) && fetchForecast();
    };

    render() {
        const {location: {city}, showHideCalendar, chosenDate, calendarShowed, data: {forecast}} = this.props;
        return (
            <ScrollView>
                <View style={styles.containerToday}>
                    <Text style={styles.city}>{city && city.toUpperCase()}</Text>
                    <Text style={styles.date}>{chosenDate}</Text>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={showHideCalendar}
                    >
                        <Text style={styles.icon}>
                            {calendarShowed ? (
                                <FontAwesome name="calendar-minus-o" size={20}/>
                            ) : (
                                <FontAwesome name="calendar" size={20}/>
                            )}
                        </Text>
                    </TouchableHighlight>

                    <Calendar
                        style={!calendarShowed ? styles.hide : styles.show}
                        minDate={createDateString()}
                        maxDate={createDateString(daysPerWeek * 2)}
                        onDayPress={this.choseDay}
                        markedDates={{
                            [chosenDate]: {
                                selected: true,
                            },
                        }}
                    />

                    {forecast && (
                        <OneDayWeather
                            forecast={forecast}
                        />
                    )}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerToday: {
        alignSelf: 'stretch',
        display: 'flex',
        minHeight: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 5,
    },
    hide: {
        display: 'none',
    },
    show: {
        width: '100%',
    },
    button: {
        margin: 10,
        padding: 10,
        marginBottom: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#171717',
    },
    city: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    date: {
        fontStyle: 'italic',
    },
    icon: {
        color: '#fff',
    },
});

const mapStateToProps = state => ({
    chosenDate: getChosenDate(state),
    calendarShowed: state.today.calendarShowed,
    data: {
        forecast: selectOneDayForecast(state),
        fetchingState: selectForecastFetchingState(state)
    },
    location: selectlocation(state)
});

const mapDispatchToProps = dispatch => ({
    fetchForecast: () => dispatch(fetchDailyForecast()),
    showHideCalendar: () => dispatch(toggleCalendar()),
    changeDate: (date) => dispatch(dateChosen(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Today);
