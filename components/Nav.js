import React from "react";
import { routeList } from "@/resources/routeList";
import useActions from "@/hooks/useActions";
import { useRouter } from "next/router";
import logo from "@/public/logo.jpg";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import {
  HamburguerIcon,
  LeftArrowIcon,
  RightArrowIcon,
  UpArrowIcon,
} from "./Icons";

const Nav = () => {
  const { pathname } = useRouter();
  const {
    changeNavbar,
    navbar,
    toggle,
    setNavbar,
    changeToggle,
    opcInventory,
    opcBusiness,
    opcAdmin,
    changeOpcInventory,
    changeOpcBusiness,
    changeOpcAdmin,
  } = useActions();

  const inactiveLink =
    "flex px-2 py-3 lg:py-2 py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f] ";
  const inactiveIcon = "w-6 h-6";
  const activeIcon = `${inactiveIcon} text-primary fill-primary`;

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

        <nav className="h-full flex flex-col ">
          <ul className={navbar ? "p-3 flex flex-col gap-1" : ""}>
            {routeList.map(({ id, route, path, icon }) => {
              if (path === "inventory") {
                return (
                  <div key={id}>
                    <button
                      className={`${
                        opcInventory
                          ? "bg-slate-200 flex lg:py-2 py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f]"
                          : inactiveLink
                      } cursor-pointer w-full ${
                        navbar
                          ? "text-[12px] flex-col items-center rounded-md "
                          : "gap-4 "
                      }`}
                      onClick={changeOpcInventory}
                    >
                      {icon
                        ? React.cloneElement(icon, {
                            className:
                              pathname === path ? activeIcon : inactiveIcon,
                          })
                        : null}
                      <span
                        className={`flex-1 flex items-center justify-between gap-3`}
                      >
                        {route}
                        <UpArrowIcon
                          className={`w-3 h-3 transition-transform duration-700 ${
                            opcInventory ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                    {opcInventory && (
                      <ul className="pt-2 pl-5">
                        {routeList
                          .filter(
                            ({ path }) =>
                              path === "/inventory/products" ||
                              path === "/inventory/categories" ||
                              path === "/inventory/critical-stock" ||
                              path === "/inventory/bar-code"
                          )
                          .map(({ id, route, path, icon }) => (
                            <NavLink
                              key={id}
                              path={path}
                              icon={icon}
                              route={route}
                            />
                          ))}
                      </ul>
                    )}
                  </div>
                );
              }
              if (path === "business") {
                return (
                  <div key={id}>
                    <button
                      className={`${
                        opcBusiness
                          ? "bg-slate-200 flex lg:py-2 py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f]"
                          : inactiveLink
                      } cursor-pointer w-full ${
                        navbar
                          ? "text-[12px] flex-col items-center rounded-md "
                          : "gap-4 "
                      }`}
                      onClick={changeOpcBusiness}
                    >
                      {icon
                        ? React.cloneElement(icon, {
                            className:
                              pathname === path ? activeIcon : inactiveIcon,
                          })
                        : null}
                      <span
                        className={`flex-1 flex items-center justify-between gap-3`}
                      >
                        {route}
                        <UpArrowIcon
                          className={`w-3 h-3 transition-transform duration-500 ${
                            opcBusiness ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                    {opcBusiness && (
                      <ul className="pt-2 pl-5">
                        {routeList
                          .filter(
                            ({ path }) =>
                              path === "/business/orderslist" ||
                              path === "/business/orders" ||
                              path === "/business/debts"
                          )
                          .map(({ id, route, path, icon }) => (
                            <NavLink
                              key={id}
                              path={path}
                              icon={icon}
                              route={route}
                            />
                          ))}
                      </ul>
                    )}
                  </div>
                );
              }

              if (path === "admin") {
                return (
                  <div key={id}>
                    <button
                      className={`${
                        opcAdmin
                          ? "bg-slate-200 flex lg:py-2 py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f]"
                          : inactiveLink
                      } cursor-pointer w-full ${
                        navbar
                          ? "text-[12px] flex-col items-center rounded-md "
                          : "gap-4 "
                      }`}
                      onClick={changeOpcAdmin}
                    >
                      {icon
                        ? React.cloneElement(icon, {
                            className:
                              pathname === path ? activeIcon : inactiveIcon,
                          })
                        : null}
                      <span
                        className={`flex-1 flex items-center justify-between gap-3`}
                      >
                        {route}
                        <UpArrowIcon
                          className={`w-3 h-3 transition-transform duration-500 ${
                            opcAdmin ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                    {opcAdmin && (
                      <ul className="pt-2 pl-5">
                        {routeList
                          .filter(
                            ({ path }) =>
                              path === "/admin/users" ||
                              path === "/admin/customers" ||
                              path === "/admin/system"
                          )
                          .map(({ id, route, path, icon }) => (
                            <NavLink
                              key={id}
                              path={path}
                              icon={icon}
                              route={route}
                            />
                          ))}
                      </ul>
                    )}
                  </div>
                );
              }

              if (
                path !== "/inventory/products" &&
                path !== "/inventory/categories" &&
                path !== "/inventory/critical-stock" &&
                path !== "/inventory/bar-code" &&
                path !== "/business/orderslist" &&
                path !== "/business/orders" &&
                path !== "/business/debts" &&
                path !== "/admin/users" &&
                path !== "/admin/customers" &&
                path !== "/admin/system"
              ) {
                return (
                  <NavLink key={id} path={path} icon={icon} route={route} />
                );
              }

              return null;
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Nav;
