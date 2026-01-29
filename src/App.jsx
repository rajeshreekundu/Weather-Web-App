import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import noData from "@/assets/images/no_data.svg";

const App = () => {
  let [city, setCity] = useState("");
  let [fdetails, setFdetails] = useState();
  let getData = (event) => {
    console.log(city);
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d2feeb2f166c82a3b08a6eaa62b06c8&units=metric`,
    )
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.cod == "404") {
          setFdetails(undefined)
        } else {
          setFdetails(finalRes);
        }
      });

    setCity("");
  };

  return (
    <section className="h-full bg-gradient-to-br from-[#74ebad] to-[#95a4e5] flex items-center justify-center">
      <div className="weather-app w-[92%] sm:w-auto">
        <div className="weather-card bg-white rounded-[16px] p-[24px] shadow-[0_10px_25px_rgba(0,0,0,0.15)]">

          <form className="search-box flex gap-[10px] mb-[30px]" onSubmit={getData}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-[90%] py-[10px] px-[14px] rounded-[8px] border border-[#ddd] outline-none text-[0.938rem]"
            />
            <button className="bg-[#80d9bf] py-[10px] px-[14px] rounded-[8px] border-0 color-white cursor-pointer">🔍</button>
          </form>

          <div>
            {fdetails !== undefined ? (
              <>
                <div className="weather-info">
                  <img
                    src={`https://openweathermap.org/img/w/${fdetails.weather[0].icon}.png`}
                    alt="weather icon"
                    className="weather-icon w-80 mx-auto mb-10"
                  />
                  <h1 className="temperature">{fdetails.main.temp}</h1>
                  <h2 className="city">
                    {fdetails.name}, <span>{fdetails.sys.country}</span>
                  </h2>
                  <p className="condition capitalize">{fdetails.weather[0].description}</p>
                </div>

                <div className="weather-details">
                  <div className="detail">
                    <p className="label">Humidity</p>
                    <p className="value">{fdetails.main.humidity}</p>
                  </div>
                  <div className="detail">
                    <p className="label">Wind</p>
                    <p className="value">{fdetails.wind.speed}</p>
                  </div>
                </div> 
              </>
            ) : (
              <div className="text-center">
                 <img src={noData} alt="" className="mx-auto w-24 mb-[10px]"/>
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
