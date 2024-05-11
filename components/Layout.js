import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { HamburguerIcon } from "@/components/Icons";
import Header from "@/components/Header";
import SignIn from "@/pages/auth/signin";
import logo from "@/public/logo.jpg";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (status === "authenticated") {
    return (
      <div className="bg-grayLight min-h-screen">
        <div className="fixed z-30 md:z-10 md:relative w-full bg-white md:hidden flex px-2 py-2">
          <button onClick={() => setShowNav(true)}>
            <HamburguerIcon className="fill-red w-8 h-8" />
          </button>

          <div className="m-auto">
            <Link href="/" className="w-32">
              <Image alt="Logo" className="w-32" src={logo} />
            </Link>
          </div>
        </div>
        <div className="pt-[83.64px] md:pt-0 grid grid-cols-7 md:flex divide-y divide-gray-300 ">
          {/* <div className="pt-[101.59px] flex md:pt-0 divide-y divide-gray-300 "> */}
          <Nav show={showNav} setShowNav={setShowNav} />
          <div className=" flex flex-col items-stretch flex-grow sm:max-h-screen sm:overflow-auto col-span-7 md:col-span-5 lg:col-span-8 bg-grayLight ">
            <Header />
            <div className="sm:max-h-screen sm:overflow-auto px-2 pb-4 pt-[60.64px] md:pt-4 md:pr-4 md:pl-6 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <SignIn />;
  }
}
