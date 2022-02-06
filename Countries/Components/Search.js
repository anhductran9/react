import React from 'react';


const Countries = ({country, weather})=>{

  
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="country flag" width="300vw"/>

        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weather.current.temperature}°C</p>
        <img src={weather.current.weather_icons[0]} alt="weather" width="100vw"/>
        <p>Wind: {weather.current.wind_speed}km/h {weather.current.wind_dir}</p>
      </div>
    )
  }
  
  export default Countries