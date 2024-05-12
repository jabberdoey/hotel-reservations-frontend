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
        <div className="grid grid-rows-2 grid-flow-col gap-5">
          <div>
            <label className="text-xs uppercase font-semibold text-slate-400">Check in</label>
            <div className="date-picker">
              <DatePicker
                className="text-center"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                minDate={today}
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
            <div>
              <input
                required
                className="text-center border border-[#ddd] px-[10px] py-[5px] rounded-[5px] text-black"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => { setName(event.target.value) }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase font-semibold text-slate-400">Check out</label>
            <div className="date-picker">
              <DatePicker
                className="text-center"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                minDate={tomorrow}
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase font-semibold text-slate-400">Rooms</label>
            <div>
              <input
                required
                className="text-center bg-gray-300 border border-gray-300 px-[10px] py-[5px] rounded-[5px] text-black"
                type="text"
                disabled
                value={availableRooms.length}
              />
            </div>
          </div>
        </div>
        <button
          className="mt-5 font-semibold flex w-full justify-center text-center py-2 px-4 gap-2 rounded-[5px] text-sm bg-indigo-700 text-white hover:bg-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
