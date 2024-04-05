"use server";

import { fetchReservations } from "@/lib/actions/actions";
import ViewReservations from "@/components/view-reservations/view-reservations";

export default async function Page() {
  const reservations = await fetchReservations();

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col items-center justify-center">
        <a
          href="/"
          className="text-blue-600 underline hover:text-blue-800"
        >
          &larr; Go back
        </a>
        <ViewReservations
          reservations={reservations}
        />
      </div>
    </div>
  );
}
