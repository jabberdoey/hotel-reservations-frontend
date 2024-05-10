"use server";

import CheckIn from "@/components/check-in/check-in"
import { ReservationData } from "@/lib/types/types";
import { fetchReservations, checkIn } from "@/lib/actions/actions";

export default async function Page() {
  const reservations = await fetchReservations();

  async function handleOnFormSubmit(data: ReservationData) {
    "use server";

    const reservation = await checkIn(data);
    return {
      room: reservation.data.room,
      confirmation: reservation.data.confirmation,
    };
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col items-center justify-center">
        <CheckIn
          reservations={reservations}
          onFormSubmit={handleOnFormSubmit}
        />
      </div>
    </div>
  );
}
