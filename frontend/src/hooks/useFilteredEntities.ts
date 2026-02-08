import { useMemo } from 'react';
import { useTableStore } from '../store/useTableStore';
import type { Entity } from '../types/entity';

export function useFilteredEntities() {
    const entities = useTableStore((state) => state.entities);
    const healthFilter = useTableStore((state) => state.healthFilter);
    const searchQuery = useTableStore((state) => state.searchQuery);
    const sortDirection = useTableStore((state) => state.sortDirection);

    const filteredEntities = useMemo(() => {
        let result: Entity[] = entities;

        // Apply health filter
        if (healthFilter.length > 0) {
            result = result.filter((entity) => healthFilter.includes(entity.health));
        }

        // Apply search filter (name OR location)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (entity) =>
                    entity.name.toLowerCase().includes(query) ||
                    entity.location.toLowerCase().includes(query)
            );
        }

        // Apply sorting - only copy if we need to sort
        if (sortDirection) {
            // Use slice() instead of spread for better performance
            result = result.slice().sort((a, b) => {
                const diff = a.power - b.power;
                return sortDirection === 'asc' ? diff : -diff;
            });
        }

        return result;
    }, [entities, healthFilter, searchQuery, sortDirection]);

    return filteredEntities;
}
