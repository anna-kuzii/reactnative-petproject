// @flow
import {put, call, takeEvery, select} from 'redux-saga/effects';
import {
  fetchingAllergy,
  fetchingAllergySuccess,
  fetchingAllergyFailure,
} from '../actions/allergy';
import {
  fetchingBreathing,
  fetchingBreathingSuccess,
  fetchingBreathingFailure,
} from '../actions/breathing';
import { getForecast } from '../../api/api';
import {getPercent} from '../../utils/utils';
import { FETCH_GEOCODE } from '../constants';

const MAX_ALLERGY_INDEX_VALUE = 5;
const MAX_BREATHING_INDEX_VALUE = 10;
const CHART_OFFSET = 1;

type WeatherAllergyData = {
  dayInd: Array<string>,
  daypartName: Array<string>,
  fcstValid: Array<number>,
  fcstValidLocal: Array<string>,
  grassPollenCategory: Array<string>,
  grassPollenIndex: Array<number>,
  num: Array<number>,
  ragweedPollenCategory: Array<string>,
  ragweedPollenIndex: Array<string>,
  treePollenCategory: Array<string>,
  treePollenIndex: Array<string>,
};

type WeatherAllergy = {
  day: WeatherAllergyData,
  night: WeatherAllergyData,
};

const defaultData = {
  allergy: [
    {
      title: 'Tree Pollen',
      type: 'treePollen',
      icon: 'tree',
    },
    {
      title: 'Grass Pollen',
      type: 'grassPollen',
      icon: 'pagelines',
    },
    {
      title: 'Ragweed Pollen',
      type: 'ragweedPollen',
      icon: 'envira',
    },
  ],
  breathing: [
    {
      title: 'Breathing Comfort',
      type: 'breathing',
      icon: 'envira',
    },
  ],
};

function* getAllergyData() {
  yield put(fetchingAllergy());

  try {
    const geocode = yield select(state => state.geocode.location.geocode);
    const allergy = yield getData(geocode, 'allergy', MAX_ALLERGY_INDEX_VALUE);

    yield put(fetchingAllergySuccess(allergy));
  } catch (error) {
    yield put(fetchingAllergyFailure({ error }));
  }
}

function* getBreathingData() {
  yield put(fetchingBreathing());

  try {
    const geocode = yield select(state => state.geocode.location.geocode);
    const breathing = yield getData(geocode, 'breathing', MAX_BREATHING_INDEX_VALUE);

    yield put(fetchingBreathingSuccess(breathing));
  } catch (error) {
    yield put(fetchingBreathingFailure({ error }));
  }
}

export function* allergySaga() {
  yield call(getAllergyData);
  yield call(getBreathingData);
  yield takeEvery(FETCH_GEOCODE, getAllergyData);
}

const formatDate = (property: string, data: WeatherAllergy, maxValue: number) => {
  const partOfDay = data.day.fcstValidLocal[0] ? data.day : data.night;
  return {
    [property]: defaultData[property].map(data => {
      const index =
        property === 'breathing'
          ? getPercent(
            maxValue - partOfDay[`${data.type}Index`][0] + CHART_OFFSET,
            maxValue,
          )
          : getPercent(
            partOfDay[`${data.type}Index`][0] + CHART_OFFSET,
            maxValue,
          );
      return {
        ...data,
        index,
        category: partOfDay[`${data.type}Category`][0],
      };
    }),
  };
};

const getData = async (geocode, type, maxValue) => {
  const weatherData: WeatherAllergy = await getForecast({
    geocode,
    type,
    units: null,
  });

  return formatDate(type, weatherData, maxValue);
};

export default allergySaga;
