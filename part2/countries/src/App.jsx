import { useState, useEffect } from 'react'
import countriesService from "./services/countries"
import CountryData from "./components/CountryData"

const CountriesList = ({filteredCountries, filter, setCountry, weather, country}) => {
  const showCountry = (country) => {
    setCountry(country)
  }

  if (country!==null && weather !==null) {
    return(
      <CountryData country={country} weather={weather} />
    )
  } else if (filter === '') {
    return(
      <p>Start to type your filter</p>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length == 0) {
    return (
      <p>No matches, specify another filter</p>
    )
  } else {
    return (
      <>
      {filteredCountries.map(country => 
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>show</button>
        </p>
      )}
      </>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather,setWeather] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    countriesService
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    // skip if country is not defined
    if (country) {
      countriesService
      .getWeather(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log("here is the error", error)
      })
    }
  }, [country])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const newFilter = event.target.value
    setFilteredCountries(countries.filter((x) => x.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    setCountry(null)
    setWeather(null)
  }
  return (
    <>
      <div>find countries: <input value={filter} onChange={handleFilterChange} /></div>
      <CountriesList filteredCountries={filteredCountries} filter={filter} weather={weather} setCountry={setCountry} country={country} />
    </>
  )
}

export default App
