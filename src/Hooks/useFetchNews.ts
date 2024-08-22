import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

interface NewsArticle {
    title: string;
    url: string;
}

export const useFetchNews = () => {
    const [data, setData] = useState<NewsArticle[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch news data');
                }
                const result = await response.json();
                setData(result.articles.map((article: any) => ({
                    title: article.title,
                    url: article.url,
                })));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    return { data, loading, error };
};
