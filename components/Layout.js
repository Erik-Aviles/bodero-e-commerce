import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Nav from "./Nav";
import { HamburguerIcon } from "./Icons";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  // if (!session) {
  //   return (
  //     <div className="bg-grayLight w-screen h-screen flex items-center">
  //       <div className="text-center w-full">
  //         <button
  //           onClick={() => signIn("google")}
  //           className="bg-white p-2 text-black rounded-lg"
  //         >
  //           Login con Google
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="bg-grayLight min-h-screen ">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <HamburguerIcon />
        </button>
        <Logo className="flex grow justify-center mr-6" />
      </div>
      <div className="grid grid-cols-6 ">
        <Nav show={showNav} />
        <div className=" col-span-5 bg-grayLight flex-grow pr-4 pl-6 py-4 ">
          {children}
        </div>
      </div>
    </div>
  );
}
