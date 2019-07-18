import { all } from 'redux-saga/effects';
import geocodeSaga from './geocode';
import farmingSaga from './farming';
import dailyForecastSaga from './daily-forecast';
import allergySaga from './allergy';

export default function* rootSaga() {
  yield all([geocodeSaga(), farmingSaga(), dailyForecastSaga(), allergySaga()]);
}
