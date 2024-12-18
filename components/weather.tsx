// pages/news.tsx
import { GetStaticProps } from 'next';

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
}

interface WeatherAppProps {
    weatherData: WeatherData[];
  }
  

const WeatherApp: React.FC<WeatherAppProps> = ({ weatherData }) => {
  return (
    <div className="weather-container">
      <h1>Weather Updates</h1>
      <div className="city-weather-cards">
        {weatherData.map((data, index) => (
          <div key={index} className="weather-card">
            <h2>{data.name}</h2>
            <p>{data.main.temp}°C</p>
            <p>Current Temperature</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const result = await fetch(URL);
      const data: WeatherData = await result.json();
      return data;
    })
  );

  return {
    props: {
      weatherData,
    },
    revalidate: 3600, 
  };
};

export default WeatherApp;
