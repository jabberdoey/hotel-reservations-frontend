import { ReservationData, CheckOutData } from "../types/types";
import dotenv from "dotenv/config";
import hash_sum from "hash-sum";

async function fetchReservation(id: number) {
  try {
    const fetchData = async () => {
      const response = await fetch(`${process.env.BACKEND_API}/${id}` || "", {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      return data;
    }
    return fetchData();
  } catch(error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}

export async function fetchReservations() {
  try {
    const fetchData = async () => {
      const response = await fetch(process.env.BACKEND_API || "", {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      return data;
    }
    return fetchData();
  } catch(error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  }
}

export async function checkIn(data: ReservationData) {
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
    return null;
  }
}

export async function checkOut(data: CheckOutData) {
  const existingRoom = await fetchReservation(Number(data.room));
  const error = { data: { status: "Error" } }
  if (existingRoom.data.name !== data.name || existingRoom.data.room !== data.room) {
    return error;
  }

  try {
    const patchData = async () => {
      const response = await fetch(`${process.env.BACKEND_API}/${data.room}` || "", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          checkInDate: null,
          checkOutDate: null,
          confirmation: null,
          status: "Available",
        }),
      });
      const jsonData = await response.json();
      return jsonData;
    }
    return patchData();
  } catch(error) {
    console.error(`Error making a reservation: ${error}`)
    return error;
  }
}