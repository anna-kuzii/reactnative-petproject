import {
	FETCHING_DAILY_FORECAST_PENDING,
	FETCHING_DAILY_FORECAST_SUCCESS,
	FETCHING_DAILY_FORECAST_FAILURE,
	FETCH_DAILY_FORECAST,
} from '../constants';

export const fetchDailyForecast = () => ({
	type: FETCH_DAILY_FORECAST
});

export const fetchingDailyForecast = () => ({
	type: FETCHING_DAILY_FORECAST_PENDING,
});

export const fetchingDailyForecastSuccess = ({forecast, expirationTime}) => ({
	type: FETCHING_DAILY_FORECAST_SUCCESS,
	payload: {forecast, expirationTime}
});

export const fetchingDailyForecastFailure = ({error}) => ({
	type: FETCHING_DAILY_FORECAST_FAILURE,
	error,
});
