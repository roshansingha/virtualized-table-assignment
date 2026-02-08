import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '../../test/testUtils';
import userEvent from '@testing-library/user-event';
import { VirtualTable } from '../VirtualTable';
import { useTableStore } from '../../store/useTableStore';
import { mockEntities } from '../../test/testUtils';

// Mock the virtualizer
vi.mock('@tanstack/react-virtual', () => ({
    useVirtualizer: () => ({
        getVirtualItems: () =>
            mockEntities.map((_, index) => ({
                index,
                start: index * 48,
                size: 48,
                key: index,
            })),
        getTotalSize: () => mockEntities.length * 48,
    }),
}));

describe('VirtualTable', () => {
    beforeEach(() => {
        useTableStore.setState({
            entities: mockEntities,
            selectedIds: new Set(),
            viewedIds: new Set(),
            healthFilter: [],
            searchQuery: '',
            sortDirection: null,
        });
    });

    it('renders table with all entities', () => {
        render(<VirtualTable />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
        expect(screen.getByText('Gaara Sabaku')).toBeInTheDocument();
    });

    it('renders table headers', () => {
        render(<VirtualTable />);

        expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /location/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /health/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /power/i })).toBeInTheDocument();
    });

    it('selects individual rows', async () => {
        const user = userEvent.setup();
        render(<VirtualTable />);

        const checkbox = screen.getByLabelText('Select Naruto Uzumaki');
        await user.click(checkbox);

        expect(useTableStore.getState().selectedIds.has('entity-0001')).toBe(true);
    });

    it('selects all visible rows', async () => {
        const user = userEvent.setup();
        render(<VirtualTable />);

        const selectAllCheckbox = screen.getByLabelText(/select all visible rows/i);
        await user.click(selectAllCheckbox);

        const selectedIds = useTableStore.getState().selectedIds;
        expect(selectedIds.size).toBe(mockEntities.length);
        mockEntities.forEach((entity) => {
            expect(selectedIds.has(entity.id)).toBe(true);
        });
    });

    it('deselects all when clicking select all again', async () => {
        const user = userEvent.setup();
        render(<VirtualTable />);

        const selectAllCheckbox = screen.getByLabelText(/select all visible rows/i);
        await user.click(selectAllCheckbox);
        await user.click(selectAllCheckbox);

        expect(useTableStore.getState().selectedIds.size).toBe(0);
    });

    it('displays correct entity count', () => {
        render(<VirtualTable />);

        expect(screen.getByText(/showing 5 of 5 entities/i)).toBeInTheDocument();
    });

    it('displays selected count', async () => {
        const user = userEvent.setup();
        render(<VirtualTable />);

        const checkbox = screen.getByLabelText('Select Naruto Uzumaki');
        await user.click(checkbox);

        expect(screen.getByText(/1 selected/i)).toBeInTheDocument();
    });

    it('filters entities by health', () => {
        useTableStore.setState({
            healthFilter: ['Healthy'],
        });

        render(<VirtualTable />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.getByText('Rock Lee')).toBeInTheDocument();
        expect(screen.queryByText('Sasuke Uchiha')).not.toBeInTheDocument();
    });

    it('searches entities by name', () => {
        useTableStore.setState({
            searchQuery: 'Naruto',
        });

        render(<VirtualTable />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.queryByText('Sasuke Uchiha')).not.toBeInTheDocument();
    });

    it('searches entities by location', () => {
        useTableStore.setState({
            searchQuery: 'Suna',
        });

        render(<VirtualTable />);

        expect(screen.getByText('Gaara Sabaku')).toBeInTheDocument();
        expect(screen.queryByText('Naruto Uzumaki')).not.toBeInTheDocument();
    });

    it('sorts entities by power ascending', () => {
        useTableStore.setState({
            sortDirection: 'asc',
        });

        render(<VirtualTable />);

        const rows = screen.getAllByRole('row').slice(1); // Skip header
        const firstRow = rows[0];

        expect(within(firstRow).getByText('Rock Lee')).toBeInTheDocument();
    });

    it('sorts entities by power descending', () => {
        useTableStore.setState({
            sortDirection: 'desc',
        });

        render(<VirtualTable />);

        const rows = screen.getAllByRole('row').slice(1); // Skip header
        const firstRow = rows[0];

        expect(within(firstRow).getByText('Naruto Uzumaki')).toBeInTheDocument();
    });
});
