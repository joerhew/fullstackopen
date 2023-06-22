import { useState, useEffect } from 'react';
import countriesServices from './services/countries';
import weatherServices from './services/weather';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  //Initialize the countries list
  useEffect(() => {
    countriesServices
      .getAll()
      .then(countries => setCountries(countries));
  }, [])

  //update filtered countries list every time the searchTerm changes, or when the countries list is initialized
  useEffect(() => {
    const searchResults = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(searchResults);
  }, [searchTerm, countries]);

  if (!countries) {
    return null;
  }
  
  const typeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  }

  const showCountryDetails = (event) => {
    const selectedCountry = countries.filter(country =>
      country.cca2 === event.target.id
    );
    setFilteredCountries(selectedCountry);
    setSearchTerm(selectedCountry[0].name.common);
  }

  return (
    <div>
      <p>
        find countries: <input value={searchTerm} onChange={typeSearchTerm} />
      </p>
      <Content countries={filteredCountries} showCountryDetails={showCountryDetails} />
    </div>
  );
}

const Content = ({ countries, showCountryDetails }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return <ListOfCountries countries={countries} showCountryDetails={showCountryDetails} />
  } else if (countries.length === 1) {
    return <CountryDetails key={countries[0].cca2} country={countries[0]} />
  }
}

const ListOfCountries = ({ countries, showCountryDetails }) => (
  <>
    {countries.map(country => {
      return <CountryInList key={country.cca2} country={country} showCountryDetails={showCountryDetails}/>
    })}
  </>
)

const CountryInList = ({ country, showCountryDetails }) => (
  <>
    <p>{country.name.common} <button id={country.cca2} onClick={showCountryDetails}>show</button></p>
  </>

)

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherServices
      .getWeather(country.capital)
      .then(response => {
        setWeather(response);
      });
  }, [country.capital]);

  if (!weather) {
    return 'Loading...';
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      {Object.values(country.languages).map((language, index) => 
        <p key={index}>{language}</p>
      )}
      <img src={country.flags.svg} height='300px' width='auto'></img>
      <h2>Weather in {country.capital}</h2>
      <img src={weather.current.condition.icon} height="200px" width='auto'></img>
      <p>Current condition is '{weather.current.condition.text}'</p>
      <p>Current temp is {weather.current.temp_c} degrees Celcius</p>
    </>
  )
}

export default App;
