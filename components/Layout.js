import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import SignIn from "@/pages/auth/signin";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (status === "authenticated") {
    return (
      <div className="bg-grayLight min-h-screen">
        <div className="grid grid-cols-7 md:flex divide-y divide-gray-300 ">
          <Nav show={showNav} setShowNav={setShowNav} />
          <div className=" flex flex-col gap-4 flex-grow items-stretch sm:max-h-screen sm:overflow-auto col-span-7 md:col-span-5 lg:col-span-8 bg-grayLight ">
            <Header setShowNav={setShowNav} />
            <div className="sm:max-h-screen px-4">{children}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <SignIn />;
  }
}
