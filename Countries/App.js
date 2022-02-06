import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Countries";
import Countries from "./components/Search";

const API_KEY = process.env.REACT_APP_API_KEY

// http://api.weatherstack.com/current?access_key=2267b7281a4d4bf74caacc4350d43d14&query=hanoi
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredName, setFilteredName] = useState(countries);
  const [weather, setWeather] = useState({})


  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    axios.get('http://api.weatherstack.com/current', { params: { access_key: "2267b7281a4d4bf74caacc4350d43d14", query: "Hanoi" } })
    .then(response => {
    console.log(response.data)
    setWeather(response.data)
  });
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    event.preventDefault(); 
    setFilteredName(countries.filter(country => country.name.includes(event.target.value)))
  }

  if (filteredName.length <= 10 && filteredName.length > 1) {
    return (
        <div>
          <h2>Find Country</h2>
            Find Country: <input
            onChange={handleFilterChange}/>
          <ul>
            {filteredName.map((country) => <Country key={country.id} country={country} />)}
          </ul>
      </div>
    )}
  else if (filteredName.length === 1) {
    return (
      <div>
        <h2>Find Country</h2>
            Find Country: <input
            onChange={handleFilterChange}/>
            {filteredName.map((country) => <Countries key={country.id} country={country} weather={weather}/>)}
        
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Find Country</h2>
          Find Country: <input
          onChange={handleFilterChange}/>
        <p>Too many matches</p>
      </div>
    )
  }
};

export default App;