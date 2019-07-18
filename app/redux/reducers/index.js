import { combineReducers } from 'redux';
import geocode from './geocode';
import dailyForecast from './daily-forecast';
import farming from './farming/farming';
import today from './today/today';
import allergy from './allergy/allergy';
import breathing from './breathing/breathing';

const rootReducer = combineReducers({
    geocode,
    farming,
    dailyForecast,
    today,
    allergy,
    breathing,
});

export default rootReducer;
