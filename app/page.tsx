import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto p-10 text-center">
      <h1 className="text-2xl md:text-3xl font-bold">Please select an option:</h1>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
        <Link
          href="/check-in"
          className="w-1/2 border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          Check in
        </Link>
        <Link
          href="/check-out"
          className="w-1/2 border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          Check out
        </Link>
        <Link
          href="/view-reservations"
          className="w-1/2 border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          See all reservations
        </Link>
      </div>
    </div>
  );
}
