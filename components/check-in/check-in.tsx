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
      <div>
        <div className="text-center text-slate-400 border-b-[1px] border-gray-800 pb-5 mb-5 -mx-5">
          <p className="font-bold text-xl">Reservation confirmed!</p>
          <p className="text-sm">Please save the following information for your reference.</p>
        </div>
        <div className="flex flex-row gap-5">
          <div>
            <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
            <div>
              <input
                disabled
                className="text-center border border-[#545964] px-[10px] py-[5px]  rounded-[5px] text-black"
                type="text"
                value={name}
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
                value={assignedRoom}
              />
            </div>
          </div>
        </div>
        <div>
        <div className="flex flex-row w-full mt-5">
          <div className="w-full">
            <label className="text-xs uppercase font-semibold text-slate-400">Confirmation</label>
            <div>
              <input
                disabled
                className="w-full flex text-center border border-[#545964] px-[10px] py-[5px] rounded-[5px] text-black"
                type="text"
                value={confirmation}
              />
            </div>
          </div>
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
            <label className="text-xs uppercase font-semibold text-slate-400">Available Rooms</label>
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
