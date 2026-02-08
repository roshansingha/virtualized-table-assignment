import { memo, useCallback } from 'react';
import { useTableStore, selectSelectedIds, selectToggleSelection } from '../store/useTableStore';
import { Checkbox } from './Checkbox';
import type { Entity } from '../types/entity';

interface TableRowProps {
    entity: Entity;
    isViewed: boolean;
    style: React.CSSProperties;
}

export const TableRow = memo(function TableRow({ entity, isViewed, style }: TableRowProps) {
    const selectedIds = useTableStore(selectSelectedIds);
    const toggleSelection = useTableStore(selectToggleSelection);
    const isSelected = selectedIds.has(entity.id);

    const handleToggle = useCallback(() => {
        toggleSelection(entity.id);
    }, [entity.id, toggleSelection]);

    return (
        <div
            className={`table-row ${isViewed ? 'viewed' : ''} ${isSelected ? 'selected' : ''}`}
            style={style}
            role="row"
        >
            <div className="table-cell" role="cell">
                <Checkbox
                    checked={isSelected}
                    onChange={handleToggle}
                    ariaLabel={`Select ${entity.name}`}
                />
            </div>
            <div className="table-cell" role="cell">
                {entity.name}
            </div>
            <div className="table-cell" role="cell">
                {entity.location}
            </div>
            <div className="table-cell" role="cell">
                <span className={`health-badge health-${entity.health.toLowerCase()}`}>
                    {entity.health}
                </span>
            </div>
            <div className="table-cell" role="cell">
                {entity.power.toLocaleString()}
            </div>
        </div>
    );
});
