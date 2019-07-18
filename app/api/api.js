const api = 'https://api.weather.com/v2/turbo';
const apiV3 = 'https://api.weather.com/v3';
const apiKey = 'd522aa97197fd864d36b418f39ebb323';

const forecastType = {
  daily: 'vt1dailyForecast',
  hourly: 'vt1hourlyForecast',
  allergy: 'vt1idxPollenDayPart',
  breathing: 'vt1idxBreathingDaypart',
};

export const getLocation = (geocode = '48.97,24.40') => {
  return fetch(
    `${apiV3}/location/point?geocode=${geocode}&apiKey=${apiKey}&language=en-US&format=json`,
  ).then(response => response.json());
};

export function getForecast({ geocode, type, units }) {
  return fetch(createUrl({ geocode, type, units }))
    .then(response => response.json())
    .then(data => {
      return data[forecastType[type]];
    });
}

function createUrl({ type = 'daily', geocode, locale = 'en-US', units = 'm' }) {
  const baseUrl = `${api}/${
    forecastType[type]
  }?apiKey=${apiKey}&format=json&geocode=${geocode}&language=${locale}`;
  return units ? `${baseUrl}&units=${units}` : baseUrl;
}
