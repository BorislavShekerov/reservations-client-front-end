import { Venue } from './venue'
import { Table } from './table'

export class Reservation {
    reservationDate: string;
    venue: Venue;
    peopleAttending: number;
    tableReserved: Table;
}