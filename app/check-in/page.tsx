"use server";

import CheckIn from "@/components/check-in/check-in"
import { ReservationData } from "@/lib/types/types";
import { fetchReservations, checkIn } from "@/lib/actions/actions";
import Link from "next/link";

export default async function Page() {
  const reservations = await fetchReservations();

  async function handleOnFormSubmit(data: ReservationData): Promise<string> {
    "use server";

    const reservation = await checkIn(data);
    return reservation.data.confirmation;
  }

  return (
    <div className="container mx-auto p-10">
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800"
      >
        &larr; Go back
      </Link>
      <CheckIn
        reservations={reservations}
        onFormSubmit={handleOnFormSubmit}
      />
    </div>
  );
}
