import { useEffect } from 'react';
import { useTableStore } from '../store/useTableStore';
import type { Entity } from '../types/entity';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('VITE_API_URL environment variable is not set. Please check your .env.local file.');
}

export function useEntities() {
    const setEntities = useTableStore((state) => state.setEntities);
    const setLoading = useTableStore((state) => state.setLoading);
    const setError = useTableStore((state) => state.setError);
    const loading = useTableStore((state) => state.loading);
    const error = useTableStore((state) => state.error);

    useEffect(() => {
        let isMounted = true;

        async function fetchEntities() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Entity[] = await response.json();

                if (isMounted) {
                    setEntities(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    const message = err instanceof Error ? err.message : 'Failed to fetch data';
                    setError(message);
                    setLoading(false);
                }
            }
        }

        fetchEntities();

        return () => {
            isMounted = false;
        };
    }, [setEntities, setLoading, setError]);

    return { loading, error };
}
