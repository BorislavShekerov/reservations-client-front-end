import { Venue } from './venue'
import { Table } from './table'

export class Reservation {
    reservationDate: number[];
    venue: Venue;
    peopleAttending: number;
    tableReserved: Table;
}