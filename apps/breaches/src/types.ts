export interface Data {
    Name: string;
    Domain: string;
    BreachDate: string;
}

export type Order = 'asc' | 'desc';

export interface Column {
    id: keyof Data;
    label: string;
}