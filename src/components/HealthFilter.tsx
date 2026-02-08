import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { useTableStore, selectHealthFilter, selectSetHealthFilter } from '../store/useTableStore';
import type { Health } from '../types/entity';

const HEALTH_OPTIONS: Health[] = ['Healthy', 'Injured', 'Critical'];

export const HealthFilter = memo(function HealthFilter() {
    const healthFilter = useTableStore(selectHealthFilter);
    const setHealthFilter = useTableStore(selectSetHealthFilter);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const toggleHealth = useCallback(
        (health: Health) => {
            const newFilter = healthFilter.includes(health)
                ? healthFilter.filter((h) => h !== health)
                : [...healthFilter, health];
            setHealthFilter(newFilter);
        },
        [healthFilter, setHealthFilter]
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    return (
        <div className="health-filter" ref={dropdownRef} onKeyDown={handleKeyDown}>
            <button
                onClick={toggleDropdown}
                aria-label="Filter by health status"
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="filter-button"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M1.5 3.5h13M3.5 6.5h9M5.5 9.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {healthFilter.length > 0 && (
                    <span className="filter-badge">{healthFilter.length}</span>
                )}
            </button>

            {isOpen && (
                <div className="filter-dropdown" role="menu">
                    {HEALTH_OPTIONS.map((health) => (
                        <label key={health} className="filter-option" role="menuitemcheckbox">
                            <input
                                type="checkbox"
                                checked={healthFilter.includes(health)}
                                onChange={() => toggleHealth(health)}
                                aria-label={`Filter by ${health}`}
                            />
                            <span>{health}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
});
