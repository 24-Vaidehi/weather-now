import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const apiKey = "72bfdad4eb1696e3a590fde8dcf73c6d"; // Replace this with your OpenWeather API key

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("City not found, please try again");
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#e0f7fa",
        height: "100vh",
      }}
    >
      <h1>🌤️ Weather Now</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px", marginRight: "10px" }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: "10px 15px",
          backgroundColor: "#00796b",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
