enum Status {
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
}

export type ReservationData = {
    name: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
}
