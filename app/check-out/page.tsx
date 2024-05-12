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
    <div className="container mx-auto mt-5">
      <div className="flex flex-col items-center justify-center">
        <CheckOut
          onFormSubmit={handleOnFormSubmit}
        />
      </div>
    </div>
  );
}
