import { Venue } from './venue';

export interface TablePrimaryKey {
    number: number;
    venueBelongingTo: Venue;
}
export interface Table {
    tablePrimaryKey: TablePrimaryKey;
}

export interface ReservationRequest {
    reservationDate: string;
    venue: Venue;
    peopleAttending: number;
    tableReserved: Table;
}