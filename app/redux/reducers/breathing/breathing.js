import {
  FETCHING_BREATHING_PENDING,
  FETCHING_BREATHING_SUCCESS,
  FETCHING_BREATHING_FAILURE,
} from './constants';

const initialState = {
  breathingData: [],
  loadingBreathing: false,
  loadedBreathing: false,
  errorBreathing: null,
};

export default function breathingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_BREATHING_PENDING:
      return {
        ...state,
        loadingBreathing: true,
        loadedBreathing: false,
        errorBreathing: null,
      };
    case FETCHING_BREATHING_SUCCESS:
      return {
        ...state,
        breathingData: action.payload,
        loadingBreathing: false,
        loadedBreathing: true,
      };
    case FETCHING_BREATHING_FAILURE:
      return {
        ...state,
        loadingBreathing: false,
        loadedBreathing: false,
        errorBreathing: action.error,
      };
    default:
      return state;
  }
}
