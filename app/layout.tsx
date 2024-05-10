import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CheckIn from "@/components/icons/check-in";
import CheckOut from "@/components/icons/check-out";
import Search from "@/components/icons/search";
import clsx from "clsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Reservations",
  description: "Manage hotel reservations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <body className={clsx(
        "bg-black",
        inter.className,
      )}>
        <div className="flex flex-row w-screen h-screen bg-[url('/background.jpg')] bg-center bg-cover">
          <div className="container m-auto text-center bg-gray-900 p-10 rounded-lg w-1/2">
            <div>
              <ul className="flex flex-row gap-5 items-center justify-center">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                        href={link.url}
                        className="flex flex-row items-center justify-center border border-slate-700 py-2 px-4 gap-2 rounded-lg text-gray-400 text-sm hover:bg-gray-700 hover:text-white"
                    >
                      {link.component}
                      {" "}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
