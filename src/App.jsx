import { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import axios from 'axios';


function App() {
  const [searchValue, setSearchValue] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
        params : {
          key: "62e62201d622448ab9a110041242903",
          q: searchValue,
        }
      });
      setWeatherData(data.data); 
    } catch (error) {
      console.log(error.message);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }   

  // useEffect(() => {
  //   if(searchValue){
  //     getWeatherData();
  //   }
  // }, [searchValue]);

  const handleSearch = () => {
    getWeatherData();
  }

  return (
    <>
      <div className='app'>
          <div className='search-div'>
            <input 
              type="text"
              className='input'
              value={searchValue} 
              placeholder='Enter city name'
              onChange={(e)=> setSearchValue(e.target.value)}
            />
            <button className='search-btn' onClick={handleSearch}>Search</button>
          </div>
          {loading && <p>Loading data...</p>}
          {weatherData ? (
            <WeatherCard data={weatherData} />
          ) : ""}
      </div>
    </>
  )
}

export default App
