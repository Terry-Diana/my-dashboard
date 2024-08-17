import React from 'react';

interface CryptoData {
    id: string;
    price: number;
    symbol: string;
}

interface CryptoWidgetProps {
    crypto: CryptoData[] | null;
    loading: boolean;
    error: string | null;
    className?: string; // Optional className prop
}

const CryptoWidget: React.FC<CryptoWidgetProps> = ({ crypto, loading, error, className }) => {
    return (
        <div className={`crypto-widget ${className}`}>
            {loading && <p>Loading cryptocurrency data...</p>}
            {error && <p>Error: {error}</p>}
            {crypto && crypto.length > 0 ? (
                <div>
                    <h2>Cryptocurrency Prices</h2>
                    <ul>
                        {crypto.map((item) => (
                            <li key={item.id}>
                                <p>Symbol: {item.symbol}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                !loading && !error && <p>No cryptocurrency data available</p>
            )}
        </div>
    );
};

export default CryptoWidget;
