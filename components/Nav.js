import React from "react";
import { LogoutIcon } from "./Icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import logo from "@/public/logo.jpg";
import Image from "next/image";
import { routeList } from "@/resources/routeList";
import NavLink from "./NavLink";

const Nav = ({ show, setShowNav }) => {
  const inactiveLink =
    "flex gap-2 px-2 py-3 md:py-2 text-base hover:bg-[#97a8bc]/10 ";

  async function logout() {
    await signOut({
      redirect: false,
    });
  }

  return (
    <>
      <div
        onClick={() => setShowNav(false)}
        className={
          (show ? `left-0` : `right-[100%]`) +
          " bg-grayDark opacity-80 w-full top-0 fixed sm:hidden h-screen z-40 transition-all"
        }
      ></div>
      <aside
        className={
          (show ? `left-0` : `right-[100%]`) +
          " w-[83%] md:w-auto col-start-1 col-end-3 bg-white top-0 text-grayDark font-semibold z-40 md:z-10 fixed h-screen  md:static transition-all"
        }
      >
        <div className="w-full py-4  flex justify-center">
          <Link href="/" className="w-40 ">
            <Image
              priority
              src={logo}
              className={`object-cover w-40`}
              alt="Logo B.D.R"
            />
          </Link>
        </div>
        <nav className=" flex flex-col gap-2">
          {routeList.map(({ id, route, path, icon }) => (
            <NavLink key={id} path={path} icon={icon} route={route} />
          ))}
          <button className={inactiveLink} onClick={logout}>
            <LogoutIcon />
            Salir
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Nav;
