import React from 'react';

interface JokeData {
    joke: string;
}

interface JokeWidgetProps {
    joke: JokeData | null;
    loading: boolean;
    error: string | null;
    className?: string; // Optional className prop
}

const JokeWidget: React.FC<JokeWidgetProps> = ({ joke, loading, error, className }) => {
    return (
        <div className={`joke-widget ${className}`}>
            {loading && <p>Loading joke...</p>}
            {error && <p>Error: {error}</p>}
            {joke ? (
                <div>
                    <h2>Joke of the Day</h2>
                    <p>{joke.joke}</p>
                </div>
            ) : (
                !loading && !error && <p>No joke available</p>
            )}
        </div>
    );
};

export default JokeWidget;
