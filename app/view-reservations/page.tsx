"use server";

import { fetchReservations } from "@/lib/actions/actions";
import ViewReservations from "@/components/view-reservations/view-reservations";

export default async function Page() {
  const reservations = await fetchReservations();

  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-col items-center justify-center">
        <ViewReservations
          reservations={reservations}
        />
      </div>
    </div>
  );
}
