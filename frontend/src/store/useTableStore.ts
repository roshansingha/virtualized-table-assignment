import { create } from 'zustand';
import type { Entity, Health, SortDirection } from '../types/entity';

interface TableState {
    // Data
    entities: Entity[];
    loading: boolean;
    error: string | null;

    // Selection
    selectedIds: Set<string>;
    viewedIds: Set<string>;

    // Filters & Sort
    healthFilter: Health[];
    searchQuery: string;
    sortDirection: SortDirection;

    // Actions
    setEntities: (entities: Entity[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    toggleSelection: (id: string) => void;
    toggleAllSelection: (filteredIds: string[]) => void;
    clearSelection: () => void;

    markAsViewed: () => void;
    markAsUnviewed: () => void;

    setHealthFilter: (health: Health[]) => void;
    setSearchQuery: (query: string) => void;
    setSortDirection: (direction: SortDirection) => void;
}

export const useTableStore = create<TableState>((set) => ({
    // Initial state
    entities: [],
    loading: false,
    error: null,
    selectedIds: new Set(),
    viewedIds: new Set(),
    healthFilter: [],
    searchQuery: '',
    sortDirection: null,

    // Actions
    setEntities: (entities) => set({ entities }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    toggleSelection: (id) =>
        set((state) => {
            const currentIds = Array.from(state.selectedIds);
            const newIds = state.selectedIds.has(id)
                ? currentIds.filter((i) => i !== id)
                : [...currentIds, id];
            return { selectedIds: new Set(newIds) };
        }),

    toggleAllSelection: (filteredIds) =>
        set((state) => {
            const allSelected = filteredIds.every((id) => state.selectedIds.has(id));
            const currentIds = Array.from(state.selectedIds);

            if (allSelected) {
                // Remove all filtered IDs
                const newIds = currentIds.filter((id) => !filteredIds.includes(id));
                return { selectedIds: new Set(newIds) };
            } else {
                // Add all filtered IDs
                const newIds = new Set([...currentIds, ...filteredIds]);
                return { selectedIds: newIds };
            }
        }),

    clearSelection: () => set({ selectedIds: new Set() }),

    markAsViewed: () =>
        set((state) => {
            const currentViewed = Array.from(state.viewedIds);
            const selectedArray = Array.from(state.selectedIds);
            const newViewed = new Set([...currentViewed, ...selectedArray]);
            return { viewedIds: newViewed };
        }),

    markAsUnviewed: () =>
        set((state) => {
            const currentViewed = Array.from(state.viewedIds);
            const selectedArray = Array.from(state.selectedIds);
            const newViewed = currentViewed.filter((id) => !selectedArray.includes(id));
            return { viewedIds: new Set(newViewed) };
        }),

    setHealthFilter: (health) => set({ healthFilter: health }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortDirection: (direction) => set({ sortDirection: direction }),
}));

// Selectors for optimized subscriptions
export const selectSelectedIds = (state: TableState) => state.selectedIds;
export const selectViewedIds = (state: TableState) => state.viewedIds;
export const selectEntities = (state: TableState) => state.entities;
export const selectHealthFilter = (state: TableState) => state.healthFilter;
export const selectSearchQuery = (state: TableState) => state.searchQuery;
export const selectSortDirection = (state: TableState) => state.sortDirection;
export const selectLoading = (state: TableState) => state.loading;
export const selectError = (state: TableState) => state.error;

// Action selectors
export const selectToggleSelection = (state: TableState) => state.toggleSelection;
export const selectToggleAllSelection = (state: TableState) => state.toggleAllSelection;
export const selectMarkAsViewed = (state: TableState) => state.markAsViewed;
export const selectMarkAsUnviewed = (state: TableState) => state.markAsUnviewed;
export const selectSetHealthFilter = (state: TableState) => state.setHealthFilter;
export const selectSetSearchQuery = (state: TableState) => state.setSearchQuery;
export const selectSetSortDirection = (state: TableState) => state.setSortDirection;
