import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
}

const getCountry = (name) => {
  return axios.get(`${baseUrl}/api/name/${name}`)
}

const countryService = {
  getAll: getAll,
  getCountry: getCountry
}

export default countryService