export enum Status {
    AVAILABLE = 'Available',
    UNAVAILABLE = 'Unavailable',
}

export type Reservation = {
    name: string;
    room: number;
    status: Status;
    checkInDate: string;
    checkOutDate: string;
    createdAt: string;
    updatedAt: string;
    confirmation: string;
}

export type ReservationData = {
    room: number;
    name: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    status: Status;
}

export type CheckOutData = {
    room: number;
    name: string;
}