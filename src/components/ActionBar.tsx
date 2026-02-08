import { memo, useCallback } from 'react';
import { useTableStore, selectSelectedIds } from '../store/useTableStore';
import { SearchBar } from './SearchBar';

export const ActionBar = memo(function ActionBar() {
    const selectedIds = useTableStore(selectSelectedIds);
    const hasSelection = selectedIds.size > 0;

    const handleSubmit = useCallback(() => {
        const selectedArray = Array.from(selectedIds);
        console.log('Selected entity IDs:', selectedArray);
    }, [selectedIds]);

    return (
        <div className="action-bar">
            <SearchBar />
            <button
                onClick={handleSubmit}
                disabled={!hasSelection}
                aria-label={hasSelection ? `Submit ${selectedIds.size} selected entities` : 'Submit selected entities (none selected)'}
                aria-disabled={!hasSelection}
                className="action-button submit-button"
            >
                Submit
            </button>
        </div>
    );
});
