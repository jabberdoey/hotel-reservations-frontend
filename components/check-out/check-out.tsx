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

  if (status === "Available") {
    return (
      <div className="text-2xl text-center leading-10 mt-10">
        <p className="font-bold">You have successfully checked out!</p>
        <p className="font-normal text-lg mb-16">Book with us again soon.</p>
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-300 opacity-0 opacity-100">
      <form onSubmit={async (event) => { 
        event.preventDefault();

        const status = await onFormSubmit({ name, room: Number(room) });
        setStatus(status);
      }}>
        <div className="my-5">
          <label className="text-xs uppercase font-semibold text-slate-400">Name</label>
          <div className="">
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
          <label className="text-xs uppercase font-semibold text-slate-400">Room</label>
          <div>
            <input
              required
              className="border border-[#ddd] px-[10px] py-[5px] rounded-[5px] text-black"
              type="number"
              min={1}
              placeholder="Enter room"
              value={room}
              onChange={(event) => { setRoom(event.target.value) }}
            />
          </div>
        </div>
        <div className="mt-10">
          <button className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-[5px] hover:bg-blue-900">
            Check out
          </button>
        </div>
      </form>
    </div>
  );
}
