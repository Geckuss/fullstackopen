
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

  useEffect(() => {
    CountryService.getAll().then(response => setCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Countries</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for a country" />
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
        </div>
      )}
    </div>
  );
}

export default App;