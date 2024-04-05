import dotenv from "dotenv/config";
import { ReservationData } from "../types/types";
import hash_sum from "hash-sum";

export async function fetchReservations() {
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

export async function makeReservation(data: ReservationData) {
    try {
        const patchData = async () => {
            const response = await fetch(`${process.env.BACKEND_API}/${data.room}` || "", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    confirmation: hash_sum(`${data.name}-${data.room}`),
                }),
            });
            const jsonData = await response.json();
            return jsonData;
        }
        return patchData();
    } catch(error) {
        console.error(`Error making a reservation: ${error}`)
        return false;
    }
}
