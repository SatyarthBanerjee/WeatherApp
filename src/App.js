import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=22b8b2ceacefd22800fb9190ae39767b`);
      setData(response.data);
      setShow(true);
    } catch {
      alert("Please Enter a Location");
    }
  };

  // Fetch the weather details of London when the component mounts
  useEffect(() => {
    async function fetchLondonWeather() {
      try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=London&appid=22b8b2ceacefd22800fb9190ae39767b");
        setData(response.data);
        setShow(true);
      } catch (error) {
        console.error("Failed to fetch London weather data.", error);
      }
    }

    fetchLondonWeather();
  }, []);

  useEffect(() => {
    console.log(data);
    setLocation("");
  }, [data]);

  return (
    <div className="App">
      <div className="searchbar">
        <input value={location} placeholder="Enter location" onChange={handleChange}></input>
        <img src="/Images/search-interface-symbol.png" alt="search" onClick={handleSearch}></img>
      </div>
      <div className="content">
        {data.weather && Array.isArray(data.weather) && data.weather.length > 0 ? (
          <img src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`} alt="weather icon" />
        ) : null}
        {isNaN(data.main?.temp) ? null : <h1>{parseInt(data.main?.temp - 273)}°C</h1>}
        <p>{data.sys?.country}</p>
        <h1>{data?.name}</h1>
        {show === true ? (
          <div className="cont">
            <div className="cont_1">
              <img src="/Images/humidity (2).png" alt="humidity" />
              <p>{data.main?.humidity}</p>
            </div>
            <div className="cont_1">
              <img src="/Images/wind (1).png" alt="wind" />
              <p>{data.wind?.speed}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
