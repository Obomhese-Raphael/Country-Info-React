import React, { useState } from 'react'
import CountryInfo from './CountryInfo'
import "./CountryInformation.css"

const CountryInformation = () => {
    const [countryName, setCountryName] = useState("")
    const [countryData, setCountryData] = useState(null)
    const [error, setError] = useState("")

    const handleSearch = () => {
        if(!countryName) {
            setError("The input filed cannot be empty")
            setCountryData(null)
            return
        }

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`; 
        fetch(finalURL) 
            .then((response) => response.json()) 
            .then((data) => { 
                if(data.message === "Not Found"){ 
                    setError("Country Information is not Found"); 
                    setCountryData(null); 
                }else if (data.length === 0) { 
                    setError('Please enter a valid country name.'); 
                    setCountryData(null); 
                } else { 
                    setError(''); 
                    setCountryData(data[0]); 
                } 
            }) 
            .catch(() => { 
                setError('An error occurred while fetching data.'); 
                setCountryData(null); 
            }); 
    };


    return (
    <div className='container'>
      <div className="search">
        <input 
            type="text"
            id='CountryName'
            placeholder='Enter a country name here...'
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
        />
        <button id="search-btn" onClick={handleSearch}>Search</button>
        <div id='result'>
            {error && <h3>{error}</h3>} 
            {countryData && (<CountryInfo countryData={countryData} />)} 
        </div>
      </div>
    </div>
  )
}

export default CountryInformation
