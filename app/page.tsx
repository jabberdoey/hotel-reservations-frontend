"use server";

import Reservations from "@/components/reservations/reservations";
import dotenv from "dotenv/config";

async function fetchReservations() {
  try {
    const fetchData = async () => {
      const response = await fetch(process.env.BACKEND_API || "");
      const data = await response.json();
      return data;
    }
    return fetchData();
  } catch(error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  }
}

export default async function Page() {
  const reservations = await fetchReservations();

  return (
    <div className="container mx-auto p-10">
      <Reservations
        reservations={reservations}
      />
    </div>
  );
}