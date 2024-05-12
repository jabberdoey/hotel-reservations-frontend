"use client";

import { useState } from "react";
import { CheckOutData } from "@/lib/types/types";

export default function CheckOut({
  onFormSubmit,
}: {
  onFormSubmit: (data: CheckOutData) => Promise<string>;
}) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  switch(status) {
    case "Available": {
      return (
        <div className="text-2xl text-center leading-10 mt-10">
          <p className="font-bold">You have successfully checked out!</p>
          <p className="font-normal text-lg mb-16">Book with us again soon.</p>
        </div>
      );
    }

    case "Error": {
      return (
        <div className="text-2xl text-center leading-10 mt-10">
          <p className="font-bold text-red-600">Booking information not found!</p>
          <p className="font-normal text-lg mb-16">Please check your input values and then try again.</p>
        </div>
      );
    }
  }

  return (
    <div>
      <form onSubmit={async (event) => { 
        event.preventDefault();

        const status = await onFormSubmit({ name, room: Number(room) });
        setStatus(status);
      }}>
        <div className="flex flex-row gap-5">
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
            <label className="text-xs uppercase font-semibold text-slate-400">Room</label>
            <div>
              <input
                required
                className="text-center border border-gray-300 px-[10px] py-[5px] rounded-[5px] text-black"
                type="number"
                min={1}
                placeholder="Enter room"
                value={room}
                onChange={(event) => { setRoom(event.target.value) }}
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
