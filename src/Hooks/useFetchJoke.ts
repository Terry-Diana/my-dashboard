import { useState, useEffect } from 'react';

const API_URL = 'https://v2.jokeapi.dev/joke/Any';

interface JokeData {
    joke: string;
    category: string;
}

export const useFetchJoke = () => {
    const [data, setData] = useState<JokeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJokeData = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch joke data');
                }
                const result = await response.json();
                if (result.type === 'single') {
                    setData({ joke: result.joke, category: result.category });
                } else {
                    setData({ joke: `${result.setup} - ${result.delivery}`, category: result.category });
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJokeData();
    }, []);

    return { data, loading, error };
};
