import {
  FETCHING_ALLERGY_PENDING,
  FETCHING_ALLERGY_SUCCESS,
  FETCHING_ALLERGY_FAILURE,
} from './constants';

const initialState = {
  allergyData: [],
  loadingAllergy: false,
  loadedAllergy: false,
  errorAllergy: null,
};

export default function allergyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_ALLERGY_PENDING:
      return {
        ...state,
        loadingAllergy: true,
        loadedAllergy: false,
        errorAllergy: null,
      };
    case FETCHING_ALLERGY_SUCCESS:
      return {
        ...state,
        allergyData: action.payload,
        loadingAllergy: false,
        loadedAllergy: true,
      };
    case FETCHING_ALLERGY_FAILURE:
      return {
        ...state,
        loadingAllergy: false,
        loadedAllergy: false,
        errorAllergy: action.error,
      };
    default:
      return state;
  }
}
