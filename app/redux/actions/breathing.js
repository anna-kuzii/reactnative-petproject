import {
  FETCHING_BREATHING_PENDING,
  FETCHING_BREATHING_SUCCESS,
  FETCHING_BREATHING_FAILURE,
} from '../reducers/breathing/constants';

export const fetchingBreathing = () => ({
  type: FETCHING_BREATHING_PENDING,
});

export const fetchingBreathingSuccess = ({ breathing }) => ({
  type: FETCHING_BREATHING_SUCCESS,
  payload: breathing,
});

export const fetchingBreathingFailure = ({ error }) => ({
  type: FETCHING_BREATHING_FAILURE,
  error,
});