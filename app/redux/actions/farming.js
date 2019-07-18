import {
  FETCHING_FARMING_PENDING,
  FETCHING_FARMING_SUCCESS,
  FETCHING_FARMING_FAILURE,
  FETCH_FARMING,
} from '../reducers/farming/constants';

export const fetchFarming = () => ({
  type: FETCH_FARMING,
});

export const fetchingFarming = () => ({
  type: FETCHING_FARMING_PENDING,
});

export const fetchingFarmingSuccess = ({ farming }) => ({
  type: FETCHING_FARMING_SUCCESS,
  payload: farming,
});

export const fetchingFarmingFailure = ({ error }) => ({
  type: FETCHING_FARMING_FAILURE,
  error,
});
