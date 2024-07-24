import React from "react";
import {
  HamburguerIcon,
  LeftArrowIcon,
  LogoutIcon,
  ReturnIcon,
  RightArrowIcon,
} from "./Icons";
import { routeList } from "@/resources/routeList";
import useActions from "@/hooks/useActions";
import { signOut } from "next-auth/react";
import logo from "@/public/logo.jpg";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const {
    changeNavbar,
    navbar,
    toggle,
    setNavbar,
    cerrarSesion,
    changeToggle,
  } = useActions();

  const inactiveLink =
    "flex px-2 py-3 lg:py-2 rounded-md py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f] ";

  return (
    <>
      <div
        onClick={() => changeToggle()}
        className={
          (toggle ? `left-0` : `right-[100%]`) +
          " bg-grayDark opacity-80 w-full top-0 fixed sm:hidden h-screen z-40 transition-all"
        }
      ></div>
      <aside
        className={`${
          toggle ? "right-[calc(100%-145px)]" : ""
        } fixed z-40 right-[100%] lg:relative lg:right-0 text-grayDark bg-white h-screen lg:flex lg:flex-col navbar overflow-hidden overflow-y-auto scroll ${
          navbar ? "min-w-[145px]" : "min-w-52"
        } z-20`}
      >
        <div
          className={`hidden lg:flex items-center py-3 px-3 bg-white font-bold  ${
            navbar ? "justify-center" : "justify-between"
          }`}
        >
          {!navbar && (
            <Link href="/" className="w-32 transition-colors">
              <Image
                priority
                src={logo}
                className={`object-cover w-20`}
                alt="Logo B.D.R"
              />
            </Link>
          )}
          <button
            className="hover:bg-primaryLight p-3 rounded-full transition-colors"
            onClick={changeNavbar}
          >
            {!navbar ? (
              <LeftArrowIcon fill="#ff6e01" />
            ) : (
              <RightArrowIcon fill="#ff6e01" />
            )}
          </button>
        </div>
        <div className={"p-4 flex justify-center lg:hidden"}>
          <button
            onClick={() => {
              changeToggle();
              setNavbar(true);
            }}
          >
            <HamburguerIcon className="fill-warning w-8 h-8" />
          </button>
        </div>

        <nav className="lg:h-full flex flex-col ">
          <ul className={navbar && "p-3 flex flex-col gap-1"}>
            {routeList.map(({ id, route, path, icon }) => (
              <NavLink key={id} path={path} icon={icon} route={route} />
            ))}
          </ul>
          <ul className={navbar && "p-3 "}>
            <button
              className={`${inactiveLink} w-full ${
                navbar ? "text-[12px] flex-col items-center " : "gap-4"
              }`}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogoutIcon />
              Salir
            </button>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Nav;
