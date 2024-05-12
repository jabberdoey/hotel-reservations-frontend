"use client";

import CheckIn from "@/components/icons/check-in";
import CheckOut from "@/components/icons/check-out";
import Search from "@/components/icons/search";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const links = [
    {
      url: "/check-in",
      component: <CheckIn />,
      label: "Check in",
    },
    {
      url: "/check-out",
      component: <CheckOut />,
      label: "Check out",
    },
    {
      url: "/view-reservations",
      component: <Search />,
      label: "Reservations",
    },
  ];

  return (
    <div className="flex flex-row w-screen h-screen bg-[url('/background.jpg')] bg-center bg-cover">
      <div className="container mx-auto mt-10 mb-auto text-center bg-gray-900 p-5 rounded-lg w-auto">
        <div className="border-b-[1px] border-gray-800 pb-5 -mx-5">
          <ul className="flex flex-row gap-5 items-center justify-center">
            {links.map((link, index) => {
              const linkProps = {
                href: link.url,
                className: clsx(
                  "flex flex-row items-center justify-center py-2 px-4 gap-2 rounded-lg text-sm",
                  pathname === link.url
                    ? "border border-indigo-700 bg-indigo-700 text-white"
                    : "text-gray-400 border border-slate-700 hover:bg-gray-700 hover:border-gray-700 hover:text-white",
                )
              }

              return (
                <li key={index}>
                  {
                    link.url === "/view-reservations"
                      ? <a {...linkProps}>{link.component}{" "}{link.label}</a>
                      : <Link {...linkProps}>{link.component}{" "}{link.label}</Link>
                  }
                </li>
              )
            })}
          </ul>
        </div>
        {children}
      </div>
    </div>
  );
}
