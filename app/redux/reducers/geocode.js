import {
  FETCHING_GEOCODE_PENDING,
  FETCHING_GEOCODE_SUCCESS,
  FETCHING_GEOCODE_FAILURE,
} from '../constants';

const initialState = {
  geocode: null,
  location: {
    city: 'Ivano-Frankivsk',
    geocode: '48.97,24.40',
  },
  loading: false,
  loaded: false,
  error: null,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_GEOCODE_PENDING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCHING_GEOCODE_SUCCESS:
      return {
        ...state,
        location: {
          geocode: action.payload.geocode,
          city: action.payload.location.location.city,
        },

        loading: false,
        loaded: true,
      };
    case FETCHING_GEOCODE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
