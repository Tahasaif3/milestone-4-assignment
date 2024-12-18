// app/news/page.tsx
import React from 'react';

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
}

async function fetchWeatherData(): Promise<WeatherData[]> {
  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const result = await fetch(URL, { next: { revalidate: 3600 } }); // Cache and revalidate every hour

      if (!result.ok) {
        throw new Error(`Failed to fetch weather for ${city}`);
      }

      return result.json();
    })
  );

  return weatherData;
}

export default async function NewsPage() {
  const weatherData = await fetchWeatherData();

  return (
    <div className="min-h-screen  text-white flex flex-col items-center py-10">
    <h1 className="text-4xl font-bold mb-8">News and Weather Updates</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      {weatherData.map((data, index) => (
        <div
          key={index}
          className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
          <p className="text-4xl font-bold mb-2">{data.main.temp}°C</p>
          <p className="text-sm text-gray-500">Current Temperature</p>
        </div>
      ))}
    </div>
  </div>
  );
}
