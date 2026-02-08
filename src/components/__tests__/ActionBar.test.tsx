import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '../../test/testUtils';
import userEvent from '@testing-library/user-event';
import { ActionBar } from '../ActionBar';
import { useTableStore } from '../../store/useTableStore';

describe('ActionBar', () => {
    beforeEach(() => {
        useTableStore.setState({
            selectedIds: new Set(),
            viewedIds: new Set(),
        });
        vi.clearAllMocks();
    });

    it('renders Submit button', () => {
        render(<ActionBar />);
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('disables Submit button when no selection', () => {
        render(<ActionBar />);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('enables Submit button when items are selected', () => {
        useTableStore.setState({
            selectedIds: new Set(['entity-0001', 'entity-0002']),
        });

        render(<ActionBar />);
        const submitButton = screen.getByRole('button', { name: /submit 2 selected entities/i });
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveAttribute('aria-disabled', 'false');
    });

    it('logs selected IDs to console when Submit is clicked', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        const selectedIds = new Set(['entity-0001', 'entity-0002']);

        useTableStore.setState({ selectedIds });

        const user = userEvent.setup();
        render(<ActionBar />);

        const submitButton = screen.getByRole('button', { name: /submit 2 selected entities/i });
        await user.click(submitButton);

        expect(consoleSpy).toHaveBeenCalledWith(
            'Selected entity IDs:',
            expect.arrayContaining(['entity-0001', 'entity-0002'])
        );

        consoleSpy.mockRestore();
    });

    it('logs ALL selected IDs including filtered-out rows', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        // Simulate selection that includes rows that might be filtered out
        const selectedIds = new Set(['entity-0001', 'entity-0002', 'entity-0003', 'entity-0100']);
        useTableStore.setState({ selectedIds });

        const user = userEvent.setup();
        render(<ActionBar />);

        const submitButton = screen.getByRole('button', { name: /submit 4 selected entities/i });
        await user.click(submitButton);

        // Verify ALL 4 IDs are logged, regardless of current filter state
        expect(consoleSpy).toHaveBeenCalledWith(
            'Selected entity IDs:',
            expect.arrayContaining(['entity-0001', 'entity-0002', 'entity-0003', 'entity-0100'])
        );

        const loggedArray = consoleSpy.mock.calls[0][1];
        expect(loggedArray).toHaveLength(4);

        consoleSpy.mockRestore();
    });

    it('has proper accessibility attributes', () => {
        useTableStore.setState({
            selectedIds: new Set(['entity-0001']),
        });

        render(<ActionBar />);
        const submitButton = screen.getByRole('button', { name: /submit 1 selected entities/i });

        expect(submitButton).toHaveAttribute('aria-label');
        expect(submitButton).toHaveAttribute('aria-disabled', 'false');
    });

    it('communicates disabled state to screen readers', () => {
        render(<ActionBar />);
        const submitButton = screen.getByRole('button', { name: /submit selected entities \(none selected\)/i });

        expect(submitButton).toHaveAttribute('aria-disabled', 'true');
        expect(submitButton.getAttribute('aria-label')).toContain('none selected');
    });
});
