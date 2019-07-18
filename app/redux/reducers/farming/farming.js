import {
  FETCHING_FARMING_PENDING,
  FETCHING_FARMING_SUCCESS,
  FETCHING_FARMING_FAILURE,
} from './constants';
const initialState = {
  farmingData: null,
  loading: false,
  loaded: false,
  error: null,
};

export default function dataFetchingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_FARMING_PENDING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCHING_FARMING_SUCCESS:
      return {
        ...state,
        farmingData: action.payload,
        loading: false,
        loaded: true,
      };
    case FETCHING_FARMING_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
