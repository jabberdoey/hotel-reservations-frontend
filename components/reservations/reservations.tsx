"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { Reservation } from "@/lib/types/types";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/reservations.css";

export default function Reservations({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const [name, setName] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date());
  const availableRooms = reservations.filter(reservation => reservation.status === "Available");

  if (availableRooms.length === 0) {
    return (
      <div className="font-bold text-2xl text-center">
        <p>There are no rooms available right now.</p>
        <p>Please try again at a later time.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="my-5">
        <label className="text-xs uppercase font-semibold text-slate-400">Available rooms:</label>
        <p className="font-semibold">{availableRooms.length}</p>
      </div>
      <div className="my-5">
        <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
        <div className="">
          <input
            className="border border-[#ddd] px-[10px] py-[5px] rounded-[5px] text-black"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => { setName(event.target.value) }}
          />
        </div>
      </div>
      <div className="my-5">
        <label className="text-xs uppercase font-semibold text-slate-400">Check in</label>
        <div className="date-picker">
          <DatePicker selected={checkInDate} onChange={(date) => setCheckInDate(date)} />
        </div>
      </div>
      <div className="my-5">
        <label className="text-xs uppercase font-semibold text-slate-400">Check out</label>
        <div className="date-picker">
          <DatePicker selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} />
        </div>
      </div>
      <div className="mt-10">
        <button className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-[5px] hover:bg-blue-900">
          Make reservation
        </button>
      </div>
    </div>
  );
}