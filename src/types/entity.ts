export type Location = 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo';
export type Health = 'Healthy' | 'Injured' | 'Critical';

export interface Entity {
    id: string;
    name: string;
    location: Location;
    health: Health;
    power: number;
}

export interface EntityWithViewState extends Entity {
    isViewed: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
    direction: SortDirection;
}

export interface FilterState {
    health: Health[];
    search: string;
}
