import React, { useState, useEffect, useRef } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import drizzle_icon from '../assets/drizzle.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    // Reference to the input element
    const inputRef = useRef();

    // State to store weather data
    const [weatherData, setWeatherData] = useState(null);

    // Mapping weather icons to their respective codes
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    // Function to fetch weather data for a given city
    const search = async (city) => {
        if (city.trim() === "") {
            alert('Please enter a city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            // Get the appropriate icon for the weather condition
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            // Update the state with the fetched weather data
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                location: data.name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(null);
            console.error(error);
        }
    };

    // Fetch weather data for 'Mumbai' when the component mounts
    useEffect(() => {
        search('Mumbai');
    }, []);

    return (
        <div className='weather'>
            <div className='search'>
                <input ref={inputRef} type="text" placeholder='search'/>
                <img src={search_icon} alt='search' onClick={() => search(inputRef.current.value)}/>
            </div> 

            {weatherData ? (
                <>
                    <img src={weatherData.icon} className='weather-icon'/> 
                    <p className='temperature'>{weatherData.temperature}°C</p> 
                    <p className='location'>{weatherData.location}</p> 

                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>

                        <div className='col'>
                            <img src={wind_icon} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed} km/hr</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Weather;
