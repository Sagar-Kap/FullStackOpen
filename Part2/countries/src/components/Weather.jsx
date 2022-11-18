import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response.data.main.temp);
        setTemp(response.data.main.temp);
        setIcon(
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        setWind(response.data.wind.speed);
      });
  }, []);

  return (
    <div>
      <h1>Weather in {country.name.common}</h1>
      <p>Temperature: {temp}°C</p>
      <img src={icon} alt="Weather for the day" />
      <p>Wind: {wind} m/s</p>
    </div>
  );
};

export default Weather;
