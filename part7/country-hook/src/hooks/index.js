import { useState, useEffect } from 'react'
import countriesService from "../services/countries"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (name) {
    countriesService
    .getCountry(name)
      .then(response => {
        setCountry({ data: response.data, found: true })
      })
      .catch(error => {
        setCountry({ data: null, found: false })
      })
    }}, [name])

  return country
}