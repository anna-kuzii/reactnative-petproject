export const FETCH_GEOCODE = 'benelux/FETCH_GEOCODE';
export const FETCHING_GEOCODE_PENDING = 'benelux/FETCHING_GEOCODE_PENDING';
export const FETCHING_GEOCODE_SUCCESS = 'benelux/FETCHING_GEOCODE_SUCCESS';
export const FETCHING_GEOCODE_FAILURE = 'benelux/FETCHING_GEOCODE_FAILURE';

export const FETCH_DAILY_FORECAST = 'benelux/FETCH_DAILY_FORECAST';
export const FETCHING_DAILY_FORECAST_PENDING = 'benelux/FETCHING_DAILY_FORECAST_PENDING';
export const FETCHING_DAILY_FORECAST_SUCCESS = 'benelux/FETCHING_DAILY_FORECAST_SUCCESS';
export const FETCHING_DAILY_FORECAST_FAILURE = 'benelux/FETCHING_DAILY_FORECAST_FAILURE';

export const hoursPerDay = 24;
export const secondsPerMinute = 60;
export const minutesPerHour = 60;
export const millisecondsPerSecond = 1000;
export const daysPerWeek = 7;
export const hourInMillisecond = secondsPerMinute * minutesPerHour * millisecondsPerSecond;
export const dayInMillisecond = hourInMillisecond * hoursPerDay;

export const forecastLifeTimeInHours = 3;
