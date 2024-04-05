"use server";

import Reservations from "@/components/reservations/reservations";
import { ReservationData } from "@/lib/types/types";
import { fetchReservations, makeReservation } from "@/lib/actions/actions";

export default async function Page() {
  const reservations = await fetchReservations();

  async function handleOnFormSubmit(data: ReservationData): Promise<string> {
    "use server";
    const reservation = await makeReservation(data);
    return reservation?.data?.confirmation || null;
  }

  return (
    <div className="container mx-auto p-10">
      <Reservations
        reservations={reservations}
        onFormSubmit={handleOnFormSubmit}
      />
    </div>
  );
}
