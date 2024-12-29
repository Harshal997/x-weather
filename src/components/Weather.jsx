import React, { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  const fetchWeatherData = async () => {
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=d04ed8d824c04f7b87e85217242912&q=${encodeURIComponent(
      city
    )}`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        alert("Failed to fetch weather data");
      } else {
        const data = await response.json();
        const {
          temp_c: temperature,
          humidity,
          condition: { text: weatherCondition },
          wind_kph: windSpeed,
        } = data.current;
        setData([
          { temperature },
          { humidity },
          { weatherCondition },
          { windSpeed },
        ]);
        setClicked(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("finaldata", data);
  }, [data]);

  const handleClick = () => {
    setLoading(true);
    fetchWeatherData();
  };

  const WeatherCard = ({ propKey, propValue }) => {
    let suffix = "";
    if (propKey === "temperature") {
      suffix += "°C";
    } else if (propKey === "humidity") {
      suffix += "%";
    } else if (propKey === "windSpeed") {
      suffix += "kph";
    }
    return (
      <div className="weather-card">
        <h4>
          {propKey.charAt(0).toUpperCase() + propKey.slice(1).toLowerCase()}
        </h4>
        <p>
          {propValue}
          {suffix}
        </p>
      </div>
    );
  };

  return (
    <div
      className="container"
      style={{ flexDirection: "column", rowGap: 60, marginTop: 30 }}
    >
      <div className="container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {clicked && (
        <div className="weather-cards">
          {data &&
            data.length &&
            data.map((value, index) =>
              Object.entries(value).map(([key, val]) => (
                <WeatherCard
                  key={`${index}-${key}`}
                  propKey={key}
                  propValue={val}
                />
              ))
            )}
        </div>
      )}
    </div>
  );
};

export default Weather;
