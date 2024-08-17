import { useState, useEffect } from 'react';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

interface CryptoData {
    id: string;
    price: number;
    symbol: string;
}

export const useFetchCrypto = () => {
    const [data, setData] = useState<CryptoData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch cryptocurrency data');
                }
                const result = await response.json();
                const formattedData = Object.keys(result).map((key) => ({
                    id: key,
                    price: result[key].usd,
                    symbol: key.toUpperCase(),
                }));
                setData(formattedData);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoData();
    }, []);

    return { data, loading, error };
};
