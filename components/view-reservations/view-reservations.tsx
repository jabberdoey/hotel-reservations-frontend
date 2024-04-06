"use client";

import { Reservation } from "@/lib/types/types";
import { format } from "date-fns";
import "@/app/reservations.css";

export default function ViewReservations({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const filteredReservations = reservations.filter(reservation => reservation.status === "Unavailable");

  if (filteredReservations.length === 0) {
    return (
      <div className="text-2xl text-center leading-10 mt-10">
        <p className="font-bold">No reservations found!</p>
        <p className="font-normal text-lg mb-16">Please make a reservation and then try again.</p>
      </div>
    );
  }

  return (
    <div>
      <table className="view-reservations mt-10 hidden md:block">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Room</th>
            <th scope="col">Check in</th>
            <th scope="col">Check out</th>
            <th scope="col">Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.name}</td>
              <td>{reservation.room}</td>
              <td>{format(reservation.checkInDate, "MMMM d, yyyy")}</td>
              <td>{format(reservation.checkOutDate, "MMMM d, yyyy")}</td>
              <td>{reservation.confirmation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:hidden mt-10">
        <ul>
          {filteredReservations.map((reservation, index) => (
            <li className="p-5 rounded-lg gap-2 flex flex-col border items-left justify-center mb-5" key={index}>
              <div>
                <label className="uppercase font-bold mr-2 text-sm uppercase text-slate-600">Name:</label>
                <span>{reservation.name}</span>
              </div>
              <div>
                <label className="uppercase font-bold mr-2 text-sm uppercase text-slate-600">Room:</label>
                <span>{reservation.room}</span>
              </div>
              <div>
                <label className="uppercase font-bold mr-2 text-sm uppercase text-slate-600">Check in:</label>
                <span>{format(reservation.checkInDate, "MMMM d, yyyy")}</span>
              </div>
              <div>
                <label className="uppercase font-bold mr-2 text-sm uppercase text-slate-600">Check out:</label>
                <span>{format(reservation.checkOutDate, "MMMM d, yyyy")}</span>
              </div>
              <div>
                <label className="uppercase font-bold mr-2 text-sm uppercase text-slate-600">Confirmation:</label>
                <span>{reservation.confirmation}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
