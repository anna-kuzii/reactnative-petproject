import { put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchingGeocode,
  fetchingGeocodeFailure,
  fetchingGeocodeSuccess,
} from '../actions/geocode';
import { PermissionsAndroid, Platform } from 'react-native';
import { requestAndroidPermission } from '../../utils/utils';
import { getLocation } from '../../api/api';
import { FETCH_GEOCODE } from '../constants';

function* getGeocode() {
  yield put(fetchingGeocode());

  try {
    const { latitude, longitude } = yield getGeolocation();
    const geocode = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
    const location = yield getLocation(geocode);

    yield put(fetchingGeocodeSuccess({ geocode, location }));
  } catch (error) {
    yield put(fetchingGeocodeFailure({ error }));
  }
}

export function* geocodeSaga() {
  yield call(getGeocode);
  yield takeEvery(FETCH_GEOCODE, getGeocode);
}

const getGeolocation = () => {
  return Platform.OS === 'ios'
    ? getNavigatorPosition()
    : getAndroidGeolocation();
};

const getNavigatorPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        resolve(position.coords);
      },
      (error: any) => {
        reject(error);
      },
    );
  });

const getAndroidGeolocation = async () => {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return hasPermission || (await reqAndroidPermission())
    ? getNavigatorPosition()
    : null;
};

const reqAndroidPermission = async () => {
  const granted = await requestAndroidPermission({
    type: 'ACCESS_FINE_LOCATION',
    title: 'Weather Location Permission',
    message:
      'Weather App needs access to your location. Your location is needed to give you information about it weather',
  });
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default geocodeSaga;
