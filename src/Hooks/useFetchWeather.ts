import { useState, useEffect } from 'react';

const API_KEY=process.env.REACT_APP_WEATHER_API_KEY;

interface WeatherData {
    temperature: number;
    description: string;
    city: string;
    country: string;
    icon: string;
}

export const useFetchWeather = (location: string) => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const result = await response.json();
                setData({
                    temperature: result.main.temp,
                    description: result.weather[0].description,
                    city: result.name,
                    country: result.sys.country,
                    icon: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
                });
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [location]);

    return { data, loading, error };
};
