import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import type { Entity } from '../types/entity';

// Mock entities for testing
export const mockEntities: Entity[] = [
    {
        id: 'entity-0001',
        name: 'Naruto Uzumaki',
        location: 'Konoha',
        health: 'Healthy',
        power: 9000,
    },
    {
        id: 'entity-0002',
        name: 'Sasuke Uchiha',
        location: 'Konoha',
        health: 'Injured',
        power: 8500,
    },
    {
        id: 'entity-0003',
        name: 'Gaara Sabaku',
        location: 'Suna',
        health: 'Critical',
        power: 7500,
    },
    {
        id: 'entity-0004',
        name: 'Rock Lee',
        location: 'Konoha',
        health: 'Healthy',
        power: 6000,
    },
    {
        id: 'entity-0005',
        name: 'Mei Terumi',
        location: 'Kiri',
        health: 'Healthy',
        power: 8000,
    },
];

// Custom render function
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
    return render(ui, { ...options });
}

export * from '@testing-library/react';
export { customRender as render };
