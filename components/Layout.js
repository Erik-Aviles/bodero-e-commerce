import React, { useState } from "react";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import useSession from "@/hooks/useSession";
import Login from "@/pages/auth/login";

export default function Layout({ children }) {
  const { session } = useSession();

  const [showNav, setShowNav] = useState(false);

  if (session?.message === "Autorizado!") {
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
    return <Login />;
  }
}
