import { memo, useCallback, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTableStore, selectSelectedIds, selectViewedIds, selectToggleAllSelection } from '../store/useTableStore';
import { useFilteredEntities } from '../hooks/useFilteredEntities';
import { Checkbox } from './Checkbox';
import { HealthFilter } from './HealthFilter';
import { SortButton } from './SortButton';
import { TableRow } from './TableRow';

export const VirtualTable = memo(function VirtualTable() {
    const selectedIds = useTableStore(selectSelectedIds);
    const viewedIds = useTableStore(selectViewedIds);
    const toggleAllSelection = useTableStore(selectToggleAllSelection);
    const entities = useTableStore((state) => state.entities);
    const filteredEntities = useFilteredEntities();
    const parentRef = useRef<HTMLDivElement>(null);

    const filteredIds = useMemo(
        () => filteredEntities.map((e) => e.id),
        [filteredEntities]
    );

    const allSelected = useMemo(
        () =>
            filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id)),
        [filteredIds, selectedIds]
    );

    const someSelected = useMemo(
        () =>
            filteredIds.some((id) => selectedIds.has(id)) && !allSelected,
        [filteredIds, selectedIds, allSelected]
    );

    const handleToggleAll = useCallback(() => {
        toggleAllSelection(filteredIds);
    }, [filteredIds, toggleAllSelection]);

    const rowVirtualizer = useVirtualizer({
        count: filteredEntities.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 48,
        overscan: 10,
    });

    return (
        <div className="table-container">
            <div className="table-header" role="row">
                <div className="table-cell header-cell" role="columnheader">
                    <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onChange={handleToggleAll}
                        ariaLabel="Select all visible rows"
                    />
                </div>
                <div className="table-cell header-cell" role="columnheader">
                    Name
                </div>
                <div className="table-cell header-cell" role="columnheader">
                    Location
                </div>
                <div className="table-cell header-cell" role="columnheader">
                    <div className="header-with-filter">
                        Health
                        <HealthFilter />
                    </div>
                </div>
                <div className="table-cell header-cell" role="columnheader">
                    <div className="header-with-filter">
                        Power
                        <SortButton />
                    </div>
                </div>
            </div>

            <div
                ref={parentRef}
                className="table-body"
                role="rowgroup"
                style={{
                    height: '600px',
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const entity = filteredEntities[virtualRow.index];

                        // Guard against undefined entities
                        if (!entity) return null;

                        const isViewed = viewedIds.has(entity.id);

                        return (
                            <TableRow
                                key={entity.id}
                                entity={entity}
                                isViewed={isViewed}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="table-footer">
                <span>
                    Showing {filteredEntities.length} of {entities.length} entities
                </span>
                <span>
                    {selectedIds.size} selected
                </span>
            </div>
        </div>
    );
});
