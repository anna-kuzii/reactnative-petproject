import {
  FETCHING_ALLERGY_PENDING,
  FETCHING_ALLERGY_SUCCESS,
  FETCHING_ALLERGY_FAILURE,
} from '../reducers/allergy/constants';

export const fetchingAllergy = () => ({
  type: FETCHING_ALLERGY_PENDING,
});

export const fetchingAllergySuccess = ({ allergy }) => ({
  type: FETCHING_ALLERGY_SUCCESS,
  payload: allergy,
});

export const fetchingAllergyFailure = ({ error }) => ({
  type: FETCHING_ALLERGY_FAILURE,
  error,
});