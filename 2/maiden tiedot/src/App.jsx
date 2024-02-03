
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CountryService = {
  getAll: () => axios.get('https://studies.cs.helsinki.fi/restcountries/api/all'),
  getByName: (name) => axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    CountryService.getAll().then(response => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const fetchWeather = async (city) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    setWeatherData(response.data);
  };

  const handleShowClick = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      fetchWeather(filteredCountries[0].capital);
    }
  }, [filteredCountries]);

  return (
    <div>
      <h1>Countries</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for a country" />
      <input type="text" value={apiKey} onChange={handleApiKeyChange} placeholder="Enter your OpenWeatherMap API Key" />
      {searchTerm && (
        filteredCountries.length > 10
          ? <p>Over 10 matches, please specify more</p>
          : filteredCountries.length === 1
            ? <div>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>Capital: {filteredCountries[0].capital}</p>
                <p>Population: {filteredCountries[0].population}</p>
                <p>Area: {filteredCountries[0].area}</p>
                <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
                <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} />
                {weatherData && (
                  <div>
                    <h3>Weather in {filteredCountries[0].capital}</h3>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                  </div>
                )}
              </div>
            : filteredCountries.map(country => (
                <div key={country.name.common}>
                  {country.name.common}
                  <button onClick={() => handleShowClick(country)}>Show</button>
                </div>
              ))
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
          {weatherData && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;