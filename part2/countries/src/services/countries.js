import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
}

const getWeather = (lat,lon) => {
  return axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
}

export default { 
  getAll: getAll,
  getWeather: getWeather,
}