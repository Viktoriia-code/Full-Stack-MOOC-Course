const CountryData = ({country, weather}) => {
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>
          {language}
        </li>
      )}
      <img src={country.flags.png} alt={country.flags.alt} />
      </ul>
      <h2>Weather is {country.capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} alt="weather_icon" />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default CountryData