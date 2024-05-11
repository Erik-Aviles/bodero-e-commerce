import React from "react";
import {
  HomeIcon,
  ListCategoryIcon,
  LogoutIcon,
  OrderListIcon,
  ProductIcon,
} from "./Icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import logo from "@/public/logo.jpg";
import { useRouter } from "next/router";
import Image from "next/image";

const Nav = ({ show, setShowNav }) => {
  const inactiveLink =
    "flex gap-2 px-2 py-3 md:py-2 text-base hover:bg-[#97a8bc]/10 ";
  const activeLink = `${inactiveLink} bg-primaryLight text-white rounded-sm`;
  const inactiveIcon = "w-7 h-7";
  const activeIcon = `${inactiveIcon} text-primary`;
  const router = useRouter();
  const { pathname } = router;

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
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            <HomeIcon
              className={pathname === "/" ? activeIcon : inactiveIcon}
            />
            Dashboard
          </Link>
          <Link
            href={"/products"}
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
          >
            <ProductIcon
              className={
                pathname.includes("/products") ? activeIcon : inactiveIcon
              }
            />
            Productos
          </Link>

          <Link
            href={"/categories"}
            className={
              pathname.includes("/categories") ? activeLink : inactiveLink
            }
          >
            <ListCategoryIcon
              className={
                pathname.includes("/categories") ? activeIcon : inactiveIcon
              }
            />
            Categorias
          </Link>
          <Link
            href={"/orders"}
            className={pathname.includes("/orders") ? activeLink : inactiveLink}
          >
            <OrderListIcon
              className={
                pathname.includes("/orders") ? activeIcon : inactiveIcon
              }
            />
            Ordenes
          </Link>
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
