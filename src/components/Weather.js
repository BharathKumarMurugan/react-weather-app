import React, { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";

function Weather() {
  const API_KEY = "";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  // const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Chennai");
  useEffect(() => {
    console.log("city: ", city);
    fetchWeatherData("Chennai");
  }, []);
  const [weatherData, setWeatherData] = useState({
    coord: { lon: 80.2785, lat: 13.0878 },
    weather: [
      { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
    ],
    base: "stations",
    main: {
      temp: 303.14,
      feels_like: 309.16,
      temp_min: 303.14,
      temp_max: 303.14,
      pressure: 1005,
      humidity: 74,
    },
    visibility: 6000,
    wind: { speed: 1.54, deg: 160 },
    clouds: { all: 20 },
    dt: 1632408715,
    sys: {
      type: 1,
      id: 9218,
      country: "IN",
      sunrise: 1632356879,
      sunset: 1632400481,
    },
    timezone: 19800,
    id: 1264527,
    name: "Chennai",
    cod: 200,
  });

  const fetchWeatherData = (cityName) => {
    axios
      .get(baseUrl, { params: { q: cityName, appid: API_KEY } })
      .then((res) => {
        setWeatherData(res.data);
        setCity("");
      })
      .catch((err) => console.error(err));
  };

  const humanReadableTimestamp = (_timestamp) => {
    // sample input timstamp: '9/21/2021, 5:57:59 AM'
    let datetime = new Date(_timestamp * 1000).toLocaleString().split(", "); // yields => [ '9/21/2021', '5:57:59 AM' ]
    return datetime[1].trim();
  };
  return (
    <section>
      <div className="main-container">
        <div className="container">
          <form className="container__form">
            <input
              type="text"
              placeholder="Enter City"
              name="cityname"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="button"
              name="search"
              value="Go"
              onClick={() => fetchWeatherData(city)}
            />
          </form>
          <div className="container__city">
            {`${weatherData.name}, ${weatherData.sys.country}`}
          </div>
          <div className="container__temperature">
            <div className="temperature">
              <h1 id="temperature__celcius">
                {(weatherData.main.temp - 273.15).toFixed(2) + " "}
                <span className="temperaure__celcius-superscript">C</span>
              </h1>
            </div>
            <div className="temperature__description">
              {weatherData.weather[0]["main"]}
            </div>
          </div>
          <div className="container__moreDetails">
            <div className="moreDetails__humidity">
              <div className="row">
                <div className="col-6">
                  <small className="temp-properties__key">Sunrise</small>
                  <h5 className="temp-properties__value">
                    {humanReadableTimestamp(weatherData.sys.sunrise)}
                  </h5>
                </div>
                <div className="col-6">
                  <small className="temp-properties__key">Sunset</small>
                  <h5 className="temp-properties__value">
                    {humanReadableTimestamp(weatherData.sys.sunset)}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <small className="temp-properties__key">Real feel</small>
                  <h5 className="temp-properties__value">
                    {`${(weatherData.main.feels_like - 273.15).toFixed(2)} `}
                    <span id="real-feal">C</span>
                  </h5>
                </div>
                <div className="col-6">
                  <small className="temp-properties__key">Humidity</small>
                  <h5 className="temp-properties__value">
                    {`${weatherData.main.humidity} %`}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <small className="temp-properties__key">Wind speed</small>
                  <h5 className="temp-properties__value">
                    {`${weatherData.wind.speed} km/h`}
                  </h5>
                </div>
                <div className="col-6">
                  <small className="temp-properties__key">Pressure</small>
                  <h5 className="temp-properties__value">
                    {`${weatherData.main.pressure} mbar`}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Weather;
