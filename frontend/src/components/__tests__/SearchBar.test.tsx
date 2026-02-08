import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test/testUtils';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';
import { useTableStore } from '../../store/useTableStore';

describe('SearchBar', () => {
    beforeEach(() => {
        useTableStore.setState({
            searchQuery: '',
            setSearchQuery: useTableStore.getState().setSearchQuery,
        });
    });

    it('renders search input', () => {
        render(<SearchBar />);
        const input = screen.getByRole('textbox', {
            name: /search entities by name or location/i,
        });
        expect(input).toBeInTheDocument();
    });

    it('updates search query on input with debounce', async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'Naruto');

        // Should update local value immediately
        expect(input).toHaveValue('Naruto');

        // Should update store after debounce (300ms)
        await waitFor(
            () => {
                expect(useTableStore.getState().searchQuery).toBe('Naruto');
            },
            { timeout: 500 }
        );
    });

    it('handles empty search query', async () => {
        const user = userEvent.setup();
        render(<SearchBar />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'test');
        await user.clear(input);

        await waitFor(
            () => {
                expect(useTableStore.getState().searchQuery).toBe('');
            },
            { timeout: 500 }
        );
    });
});
