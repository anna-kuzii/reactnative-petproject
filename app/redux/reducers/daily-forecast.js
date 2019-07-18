import {
    FETCHING_DAILY_FORECAST_PENDING,
    FETCHING_DAILY_FORECAST_SUCCESS,
    FETCHING_DAILY_FORECAST_FAILURE,
    hourInMillisecond,
    forecastLifeTimeInHours
} from '../constants';

const initialState = {
    data: {
        forecast: null,
        expirationTime: null
    },
    loading: false,
    loaded: false,
    error: null,
};

export default function dataReducer(state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case FETCHING_DAILY_FORECAST_PENDING:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case FETCHING_DAILY_FORECAST_SUCCESS:
            return {
                ...state,
                data: {forecast: payload.forecast, expirationTime: payload.expirationTime},
                loading: false,
                loaded: true,
            };
        case FETCHING_DAILY_FORECAST_FAILURE:
            return {
                ...state,
                error,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    }
}
