import {
  FETCHING_GEOCODE_PENDING,
  FETCHING_GEOCODE_SUCCESS,
  FETCHING_GEOCODE_FAILURE,
  FETCH_GEOCODE,
} from '../constants';

export const fetchGeocode = () => ({
  type: FETCH_GEOCODE,
});

export const fetchingGeocode = () => ({
  type: FETCHING_GEOCODE_PENDING,
});

export const fetchingGeocodeSuccess = ({ geocode, location }) => ({
  type: FETCHING_GEOCODE_SUCCESS,
  payload: { geocode, location },
});

export const fetchingGeocodeFailure = ({ error }) => ({
  type: FETCHING_GEOCODE_FAILURE,
  error,
});
