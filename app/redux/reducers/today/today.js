import {
    TOGGLE_CALENDAR,
    DATE_CHOSEN
} from './constants';
import { createDateString } from "../../../utils/utils";

const initialState = {
    chosenDate: Date.now(),
    calendarShowed: false,
};

export default function todayReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DATE_CHOSEN:
            return {
                ...state,
                chosenDate: payload.date
            };
        case TOGGLE_CALENDAR:
            return {
                ...state,
                calendarShowed: !state.calendarShowed
            };
        default:
            return state;
    }
}

// selectors
export const getChosenDate = state => createDateString(0, state.today.chosenDate);
export const selectlocation = state => state.geocode.location;

export const selectOneDayForecast = state => {
    const allForecast = state.dailyForecast.data.forecast;
    if (!allForecast) return null;

    const date = getChosenDate(state);
    const index = allForecast.validDate.findIndex(elem => {
        return !elem.indexOf(date);
    });

    const forecast = {};

    for (let key in allForecast) {
        if (key === 'day' || key === 'night') {
            forecast[key] = {};
            for (let subKey in allForecast[key]) {
                forecast[key][subKey] = allForecast[key][subKey][index];
            }
        } else {
            forecast[key] = allForecast[key][index];
        }

    }
    return forecast;
};

export const selectForecastFetchingState = (state) => {
    const {loading, loaded, error} = state.dailyForecast;

    return {loading, loaded, error};
};
