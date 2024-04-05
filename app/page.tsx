import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto p-10 text-center">
      <h1 className="text-3xl font-bold">Please select an option:</h1>
      <div className="flex flex-row gap-5 items-center justify-center mt-10">
        <Link
          href="/check-in"
          className="border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          Check in
        </Link>
        <Link
          href="/check-out"
          className="border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          Check out
        </Link>
      </div>
      <h3 className="text-3xl font-bold my-10">or</h3>
      <div className="flex flex-row gap-5 items-center justify-center">
        <Link
          href="/view-reservations"
          className="border border-black rounded-[5px] px-10 py-5 hover:bg-black hover:text-white"
        >
          See all reservations
        </Link>
      </div>
    </div>
  );
}
