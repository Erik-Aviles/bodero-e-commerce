import { signIn, useSession } from "next-auth/react";
import React from "react";
import Nav from "./Nav";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-red-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 text-black rounded-lg"
          >
            Login con Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-red-600  text-black min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mr-2 mt-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
