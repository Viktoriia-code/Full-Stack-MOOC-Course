import React, { useState, useEffect } from 'react'
import countriesService from "./services/countries"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log('kuku')
  useEffect(() => {
    if (name) {
    countriesService
    .getCountry(name)
      .then(response => {
        if (response.data) {
          setCountry({ data: response.data, found: true })
        } else {
          setCountry({ data: null, found: false })
        }
      })
      .catch(error => {
        setCountry({ data: null, found: false })
      })
    }}, [name])
    console.log(country)

  return country
}

const Country = ({ country }) => {
  console.log('bbbb')
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log('here')
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App