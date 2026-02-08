import { memo, useCallback } from 'react';
import { useTableStore, selectSortDirection, selectSetSortDirection } from '../store/useTableStore';
import type { SortDirection } from '../types/entity';

export const SortButton = memo(function SortButton() {
    const sortDirection = useTableStore(selectSortDirection);
    const setSortDirection = useTableStore(selectSetSortDirection);

    const handleSort = useCallback(() => {
        const nextDirection: SortDirection =
            sortDirection === null ? 'asc' : sortDirection === 'asc' ? 'desc' : null;
        setSortDirection(nextDirection);
    }, [sortDirection, setSortDirection]);

    return (
        <button
            onClick={handleSort}
            aria-label={`Sort by power ${sortDirection === 'asc' ? 'descending' : sortDirection === 'desc' ? 'none' : 'ascending'}`}
            className="sort-button"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`sort-icon ${sortDirection || ''}`}
            >
                {sortDirection === 'asc' && <path d="M8 12V4M8 4L4 8M8 4l4 4" />}
                {sortDirection === 'desc' && <path d="M8 4v8M8 12l-4-4M8 12l4-4" />}
                {sortDirection === null && (
                    <>
                        <path d="M8 4v8" />
                        <path d="M4 8l4-4 4 4" opacity="0.3" />
                        <path d="M12 8l-4 4-4-4" opacity="0.3" />
                    </>
                )}
            </svg>
        </button>
    );
});
