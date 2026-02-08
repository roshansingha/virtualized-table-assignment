import { memo, useCallback, useState, useEffect } from 'react';
import { useTableStore, selectSetSearchQuery, selectSearchQuery } from '../store/useTableStore';

export const SearchBar = memo(function SearchBar() {
    const searchQuery = useTableStore(selectSearchQuery);
    const setSearchQuery = useTableStore(selectSetSearchQuery);
    const [localValue, setLocalValue] = useState(searchQuery);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [localValue]); // Remove setSearchQuery from deps - it's stable

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }, []);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder="Search by name or location..."
                aria-label="Search entities by name or location"
                className="search-input"
            />
        </div>
    );
});
