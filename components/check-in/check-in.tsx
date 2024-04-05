"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { Reservation, ReservationData, Status } from "@/lib/types/types";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/reservations.css";

export default function CheckIn({
  reservations,
  onFormSubmit,
}: {
  reservations: Reservation[];
  onFormSubmit: (data: ReservationData) => Promise<{
    room: number;
    confirmation: string;
  }>;
}) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [name, setName] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(today);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(tomorrow);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [assignedRoom, setAssignedRoom] = useState<number | null>(null);

  const availableRooms = reservations.filter(reservation => reservation.status === "Available");
  if (availableRooms.length === 0) {
    return (
      <div className="font-bold text-2xl text-center mt-10">
        <p>There are no rooms available right now.</p>
        <p>Please try again at a later time.</p>
      </div>
    );
  }

  if (confirmation && assignedRoom) {
    return (
      <div className="text-2xl text-center leading-10 mt-10">
        <p className="font-bold">Reservation confirmed!</p>
        <p className="font-normal text-lg">Please save the following for your reference:</p>
        <div className="mt-10">
          <div className="flex flex-col items-center justify-center my-5">
            <label className="mb-5 uppercase text-sm font-bold">Name:</label>
            <span className="bg-slate-200 px-20 py-5 text-red-500 font-extrabold">
              {name}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center my-5">
            <label className="mb-5 uppercase text-sm font-bold">Room:</label>
            <span className="bg-slate-200 px-20 py-5 text-red-500 font-extrabold">
              {assignedRoom}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center my-5">
            <label className="mb-5 uppercase text-sm font-bold">Code:</label>
            <span className="bg-slate-200 px-20 py-5 text-red-500 font-extrabold">
              {confirmation}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={async (event) => { 
        event.preventDefault();
        const availableRoom = availableRooms.find(reservation => reservation.status === "Available");
        if (!availableRoom) return;
        
        const data = await onFormSubmit({
          room: availableRoom.room,
          name,
          checkInDate,
          checkOutDate,
          status: Status.UNAVAILABLE,
        });

        setConfirmation(data.confirmation);
        setAssignedRoom(data.room);
      }}>
        <div className="my-5">
          <label className="text-xs uppercase font-semibold text-slate-400">Available rooms:</label>
          <p className="font-semibold">{availableRooms.length}</p>
        </div>
        <div className="my-5">
          <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
          <div>
            <input
              required
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
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={today}
            />
          </div>
        </div>
        <div className="my-5">
          <label className="text-xs uppercase font-semibold text-slate-400">Check out</label>
          <div className="date-picker">
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={tomorrow}
            />
          </div>
        </div>
        <div className="mt-10">
          <button className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-[5px] hover:bg-blue-900">
            Check in
          </button>
        </div>
      </form>
    </div>
  );
}
