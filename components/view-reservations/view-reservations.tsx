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
    <div className="max-h-[320px] overflow-y-scroll">
      <ul className="flex flex-col gap-5">
        {filteredReservations.map((reservation, index) => (
          <li
            key={index}
            className="grid grid-cols-2 grid-flow-row gap-5 border-b-[1px] border-gray-800 pb-10"
          >
            <div>
              <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
              <div>
                <input
                  disabled
                  className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                  type="text"
                  value={reservation.name}
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-slate-400">Room</label>
              <div>
                <input
                  disabled
                  className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                  type="text"
                  value={reservation.room}
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-slate-400">Check in</label>
              <div>
                <input
                  disabled
                  className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                  type="text"
                  value={format(reservation.checkInDate, "MMMM d, yyyy")}
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-slate-400">Check out</label>
              <div>
                <input
                  disabled
                  className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                  type="text"
                  value={format(reservation.checkOutDate, "MMMM d, yyyy")}
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-slate-400">Confirmation</label>
              <div>
                <input
                  disabled
                  className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                  type="text"
                  value={reservation.confirmation}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
