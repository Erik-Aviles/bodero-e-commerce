import React from "react";
import { justFirstWord } from "@/utils/justFirstWord";
import avatarLocal from "../public/images/avatar/avatarUser.png";
import { HamburguerIcon } from "./Icons";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.jpg";
import useSession from "@/hooks/useSession";

const Header = ({ setShowNav }) => {
  const { session } = useSession();
  const user = session?.session?.data;
  return (
    <>
      <header className="sticky top-0 z-30 md:relative bg-white w-full p-2 ">
        <div className="w-full bg-white md:hidden flex py-2">
          <button onClick={() => setShowNav(true)}>
            <HamburguerIcon className="fill-red w-8 h-8" />
          </button>
          <div className="m-auto">
            <Link href="/" className="w-32">
              <Image alt="Logo" className="w-32" src={logo} />
            </Link>
          </div>
        </div>
        <hr className="h-px border-0 bg-gray-300 md:hidden" />
        <div className="flex items-center pt-2 sm:justify-between sm:gap-4">
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            Bienvenid@
            {user?.fullname
              ? ", " + justFirstWord(user?.fullname.toUpperCase())
              : ""}
            !
          </h1>
          <div className=" flex flex-1 items-center gap-8 justify-end">
            <article className="group flex shrink-0 items-center rounded-lg transition">
              <Image
                width={30}
                height={30}
                alt={user?.fullname}
                src={user?.avatar[0] ? user?.avatar[0] : avatarLocal}
                className="h-10 w-10 rounded-full object-cover "
              />
              <p className="ms-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium capitalize">
                  {user?.fullname}
                </strong>
                <span className="text-grayDark">{user?.email}</span>
              </p>
            </article>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
