import { put, call, select, takeEvery } from 'redux-saga/effects';
import {
    fetchingDailyForecast,
    fetchingDailyForecastFailure,
    fetchingDailyForecastSuccess,
} from '../actions/daily-forecast';

import { getForecast } from '../../api/api';
import { FETCH_DAILY_FORECAST, forecastLifeTimeInHours, hourInMillisecond } from '../constants';

function* getDailyForecast() {
    yield put(fetchingDailyForecast());

    try {
        const geocode = yield select(state => state.geocode.location.geocode);
        const forecast = yield call(getForecast, {geocode, type:'daily'});
        const expirationTime = Date.now() + hourInMillisecond * forecastLifeTimeInHours;
        yield put(fetchingDailyForecastSuccess({forecast, expirationTime}));
    } catch (error) {
        console.log('error: ', error);
        yield put(fetchingDailyForecastFailure({error}));
    }
}

export function* dailyForecastSaga() {
    yield takeEvery(FETCH_DAILY_FORECAST, getDailyForecast);
}

export default dailyForecastSaga;
