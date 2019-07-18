import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  fetchingFarming,
  fetchingFarmingFailure,
  fetchingFarmingSuccess,
} from '../actions/farming';
import * as api from '../../api/api';
import type { FarmingWeather } from '../../screens/farming';
import { FETCH_GEOCODE } from '../constants';

function* getFarming() {
  yield put(fetchingFarming());

  try {
    const geocode = yield select(state => state.geocode.location.geocode);
    const farming = yield getData({ geocode });

    yield put(fetchingFarmingSuccess({ farming }));
  } catch (error) {
    yield put(fetchingFarmingFailure({ error }));
  }
}

export function* farmingSaga() {
  yield call(getFarming);
  yield takeEvery(FETCH_GEOCODE, getFarming);
}

const formatMoistureLevel = precipPct => {
  if (precipPct < 16) {
    return {
      level: 0,
      description: 'Out Of Growing Season',
    };
  }
  if (precipPct < 32) {
    return {
      level: 1,
      description: 'Very Dry',
    };
  }
  if (precipPct < 48) {
    return {
      level: 2,
      description: 'Dry',
    };
  }
  if (precipPct < 64) {
    return {
      level: 3,
      description: 'Marginally Dry',
    };
  }
  if (precipPct < 75) {
    return {
      level: 4,
      description: 'Marginally Wet',
    };
  }
  if (precipPct < 86) {
    return {
      level: 5,
      description: 'Wet',
    };
  }
  if (precipPct <= 100) {
    return {
      level: 6,
      description: 'Very Wet',
    };
  }
  return 0;
};

const getData = async ({ geocode, type = 'daily' }) => {
  const weatherData: FarmingWeather = await api.getForecast({
    geocode,
    type,
    units: 'm',
  });
  return weatherData['dayOfWeek'].map((item, index) => ({
    date: item,
    validDate: weatherData.validDate[index],
    temp: weatherData.day.precipAmt[index] || 0,
    moistureLevel: formatMoistureLevel(weatherData.day.precipPct[index]),
  }));
};
export default farmingSaga;
