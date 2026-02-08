import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../../test/testUtils';
import userEvent from '@testing-library/user-event';
import { HealthFilter } from '../HealthFilter';
import { useTableStore } from '../../store/useTableStore';

describe('HealthFilter', () => {
    beforeEach(() => {
        useTableStore.setState({
            healthFilter: [],
            setHealthFilter: useTableStore.getState().setHealthFilter,
        });
    });

    it('renders filter button', () => {
        render(<HealthFilter />);
        const button = screen.getByRole('button', { name: /filter by health status/i });
        expect(button).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
        const user = userEvent.setup();
        render(<HealthFilter />);

        const button = screen.getByRole('button', { name: /filter by health status/i });
        await user.click(button);

        expect(screen.getByText('Healthy')).toBeInTheDocument();
        expect(screen.getByText('Injured')).toBeInTheDocument();
        expect(screen.getByText('Critical')).toBeInTheDocument();
    });

    it('toggles health filter selection', async () => {
        const user = userEvent.setup();
        render(<HealthFilter />);

        const button = screen.getByRole('button', { name: /filter by health status/i });
        await user.click(button);

        const healthyCheckbox = screen.getByLabelText(/filter by healthy/i);
        await user.click(healthyCheckbox);

        expect(useTableStore.getState().healthFilter).toContain('Healthy');

        await user.click(healthyCheckbox);
        expect(useTableStore.getState().healthFilter).not.toContain('Healthy');
    });

    it('allows multiple health selections', async () => {
        const user = userEvent.setup();
        render(<HealthFilter />);

        const button = screen.getByRole('button', { name: /filter by health status/i });
        await user.click(button);

        await user.click(screen.getByLabelText(/filter by healthy/i));
        await user.click(screen.getByLabelText(/filter by injured/i));

        const filters = useTableStore.getState().healthFilter;
        expect(filters).toContain('Healthy');
        expect(filters).toContain('Injured');
        expect(filters).toHaveLength(2);
    });

    it('shows badge with filter count', async () => {
        const user = userEvent.setup();
        render(<HealthFilter />);

        const button = screen.getByRole('button', { name: /filter by health status/i });
        await user.click(button);

        await user.click(screen.getByLabelText(/filter by healthy/i));
        await user.click(screen.getByLabelText(/filter by critical/i));

        const badge = screen.getByText('2');
        expect(badge).toBeInTheDocument();
    });
});
