import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Loading from "./snnipers/Loading";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";

export default function Layout({ children }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
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

  return null;
}
