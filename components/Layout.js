import React from "react";
import Header from "@/components/Header";

import Nav from "@/components/Nav";

export default function Layout({ children }) {

    return (
      <div className="bg-grayLight min-h-screen">
        <div className="grid grid-cols-7 md:flex divide-y divide-gray-300 ">
          <Nav />
          <div className=" flex flex-col gap-4 flex-grow items-stretch sm:max-h-screen sm:overflow-auto col-span-7 md:col-span-5 lg:col-span-8 bg-grayLight ">
            <Header />
            <main className="sm:max-h-screen px-4">{children}</main>
          </div>
        </div>
      </div>
    );
  }