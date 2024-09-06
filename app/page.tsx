"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  Thermometer,
  Wind,
  Droplet,
  Eye,
  Umbrella,
  Search,
} from "lucide-react";
import { WeatherData } from "@/types";
import {
  getWindDirection,
  LoadingSkeleton,
  WeatherDetail,
  weatherIcons,
} from "@/lib/utils";

export default function WeatherApp() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch weather data");
        return;
      }

      const result: WeatherData = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    await fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData("Hyderabad");
  }, []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-400 to-purple-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-balance">
          Weather Forecast
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 pr-10 sm:px-6 sm:py-3 sm:pr-12 bg-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-white/30 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-300 text-xs sm:text-sm">{error}</p>
          )}
        </form>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          data && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-balance">
                  {data.location.name}, {data.location.country}
                </h2>
                <p className="text-sm sm:text-lg opacity-80">
                  {data.location.lat.toFixed(2)}°N,{" "}
                  {data.location.lon.toFixed(2)}°E
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-5xl sm:text-8xl font-bold">
                  {Math.round(data.current.temp_c)}°C
                </div>
                <div className="text-center">
                  {weatherIcons[data.current.condition.text] || (
                    <Cloud className="h-16 w-16 sm:h-24 sm:w-24 mx-auto" />
                  )}
                  <div className="relative group">
                    <p className="text-lg sm:text-xl font-semibold mt-2 h-12 sm:h-14 flex items-center justify-center overflow-hidden">
                      <span className="truncate">
                        {data.current.condition.text}
                      </span>
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black/80 text-white p-2 rounded text-sm">
                      {data.current.condition.text}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <WeatherDetail
                  icon={
                    <Thermometer className="h-4 w-4 sm:h-6 sm:w-6 text-red-300" />
                  }
                  label="Feels like"
                  value={`${Math.round(data.current.feelslike_c)}°C`}
                />
                <WeatherDetail
                  icon={
                    <Wind className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300" />
                  }
                  label="Wind"
                  value={`${data.current.wind_kph} kph ${getWindDirection(
                    data.current.wind_degree
                  )}`}
                />
                <WeatherDetail
                  icon={
                    <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-green-300" />
                  }
                  label="Visibility"
                  value={`${data.current.vis_km} km`}
                />
                <WeatherDetail
                  icon={
                    <Droplet className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300" />
                  }
                  label="Humidity"
                  value={`${data.current.humidity}%`}
                />
                <WeatherDetail
                  icon={
                    <Umbrella className="h-4 w-4 sm:h-6 sm:w-6 text-purple-300" />
                  }
                  label="Precipitation"
                  value={`${data.current.precip_mm} mm`}
                />
                <WeatherDetail
                  icon={
                    <Sun className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-300" />
                  }
                  label="UV Index"
                  value={data.current.uv.toString()}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
