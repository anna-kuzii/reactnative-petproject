import {
    DATE_CHOSEN,
    TOGGLE_CALENDAR
} from '../reducers/today/constants';

export const dateChosen = (date) => ({
    type: DATE_CHOSEN,
    payload: {date}
});

export const toggleCalendar = () => ({
    type: TOGGLE_CALENDAR
});
