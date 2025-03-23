"use client";
import React from "react";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

const api = {
	key: "498d5f40df742a822da531e66d68ca93",
	base: `https://api.openweathermap.org/data/2.5/weather?lat=13.4265&lon=120.4793&units=metric`,
};

const Weather = ({ bg = "bg-white/10" }) => {
	const [weather, setWeather] = React.useState(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${api.base}&appid=${api.key}`);
				const data = await response.json();
				console.log(data);
				setWeather(data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};

		fetchData();
	}, []);

	const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

	if (!weather) return null;

	return (
		<div className={`${bg} backdrop-blur-md rounded-lg p-3 text-white text-sm`}>
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-lg font-semibold">{weather.name}</h2>
				<div className="flex items-center">
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
						alt={weather.weather[0].description}
						className="w-8 h-8"
					/>
					<span className="text-2xl font-bold ml-1">
						{Math.round(weather.main.temp)}°C
					</span>
				</div>
			</div>
			<p className="text-xs mb-2 capitalize">
				{weather.weather[0].description}
			</p>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div className="flex items-center">
					<Thermometer className="w-3 h-3 mr-1" />
					<span>Feels: {Math.round(weather.main.feels_like)}°C</span>
				</div>
				<div className="flex items-center">
					<Wind className="w-3 h-3 mr-1" />
					<span>Wind: {weather.wind.speed} m/s</span>
				</div>
				<div className="flex items-center">
					<Droplets className="w-3 h-3 mr-1" />
					<span>Humidity: {weather.main.humidity}%</span>
				</div>
				<div className="flex items-center">
					<Cloud className="w-3 h-3 mr-1" />
					<span>Pressure: {weather.main.pressure} hPa</span>
				</div>
			</div>
		</div>
	);
};

export default Weather;
