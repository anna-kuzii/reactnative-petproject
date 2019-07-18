import { PermissionsAndroid } from 'react-native';
import { dayInMillisecond } from "../redux/constants";

export function addLeftZero(number) {
    return +number < 10 ? `0${number}` : number;
}

export function formatMonth(date) {
    if (!date) return '--';

    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const monthIndex = new Date(date).getMonth();
    return monthNames[monthIndex];
}

export function formatDay(date) {
    if (!date) return '--';

    let dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const dayIndex = new Date(date).getDay();
    return dayNames[dayIndex];
}

export function getDateFromISOFormat(processTime) {
    return processTime.slice(0, 10);
}

export function getTimeFromISOFormat(item) {
    return item.date.slice(11, 16);
}

// @flow
export function getPercent(value: number, max: number): number {
    return (value * 100) / max;
}

export async function requestAndroidPermission({type, title, message}) {
    try {
        return await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS[type.toUpperCase()],
            {title, message},
        );
    } catch (error) {
        throw Error(error);
    }
}

export const createDateString = (period: number = 0, date: number = Date.now()) => {
    const neededDate = new Date(date + period * dayInMillisecond);
    return `${neededDate.getFullYear()}-${addLeftZero(
        +neededDate.getMonth() + 1,
    )}-${addLeftZero(+neededDate.getDate())}`;
};
