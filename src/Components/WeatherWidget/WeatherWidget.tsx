import React from 'react';

interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
}

interface WeatherWidgetProps {
    weather: WeatherData | null;
    loading: boolean;
    error: string | null;
    className?: string; 
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, loading, error, className }) => {
    return (
        <div className={`weather-widget ${className}`}>
            {loading && <p>Loading weather data...</p>}
            {error && <p>Error: {error}</p>}
            {weather && (
                <div>
                    <h2>Weather</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2.png`} alt={weather.description} />
                </div>
            )}
            {!loading && !error && !weather && <p>No weather data available</p>}
        </div>
    );
};

export default WeatherWidget;
