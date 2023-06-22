import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;
const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&`

const getWeather = (city) => {
  return axios 
    .get(`${baseUrl}q=${city}&aqi=no`)
    .then(response => response.data)
}

export default { getWeather }