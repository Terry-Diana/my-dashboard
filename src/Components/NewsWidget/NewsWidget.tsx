import React from 'react';
import './NewsWidget.css';

interface NewsWidgetProps {
    news: {
        title: string;
        url: string;
    }[] | null;
    loading: boolean;
    error: string | null;
    className?: string; // Optional className prop
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ news, loading, error, className }) => {
    if (loading) return <div className={`news-widget ${className}`}>Loading...</div>;
    if (error) return <div className={`news-widget ${className}`}>Error: {error}</div>;

    return (
        <div className={`news-widget ${className}`}>
            <h2>Latest News</h2>
            {news && news.length > 0 ? (
                <ul>
                    {news.map((article, index) => (
                        <li key={index}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default NewsWidget;
