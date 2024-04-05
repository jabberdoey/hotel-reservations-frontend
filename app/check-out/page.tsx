"use server";

import CheckOut from "@/components/check-out/check-out";
import { checkOut } from "@/lib/actions/actions";
import { CheckOutData } from "@/lib/types/types";

export default async function Page() {
  async function handleOnFormSubmit(data: CheckOutData): Promise<string> {
    "use server";

    const reservation = await checkOut(data);
    return reservation.data.status;
  }
  
  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col items-center justify-center">
        <a
          href="/"
          className="text-blue-600 underline hover:text-blue-800"
        >
          &larr; Go back
        </a>
        <CheckOut
          onFormSubmit={handleOnFormSubmit}
        />
      </div>
    </div>
  );
}
