import React from "react";
import {
  HomeIcon,
  ListCategoryIcon,
  OrderIcon,
  ProductIcon,
  SettingIcon,
  StoreIcon,
} from "./Icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink =
    "flex gap-1 p-1 bg-white text-red-600 font-semibold rounded-l-lg ";

  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex gap-1 mb-4 mr-4">
        <StoreIcon />
        <span>Admin</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <HomeIcon />
          Dashboard
        </Link>
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <ProductIcon />
          Productos
        </Link>
        <Link
          href={"/categories"}
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
        >
          <ListCategoryIcon />
          Categorias
        </Link>
        {/* <Link
          href={"/categoriesOriginal"}
          className={
            pathname.includes("/categoriesOriginal") ? activeLink : inactiveLink
          }
        >
          <ListCategoryIcon />
          Categorias Ori
        </Link> */}
        <Link
          href={"/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <OrderIcon />
          Ordenes
        </Link>
        <Link
          href={"/setting"}
          className={pathname.includes("/setting") ? activeLink : inactiveLink}
        >
          <SettingIcon />
          Configuracion
        </Link>
        <button className="inactive">
          <SettingIcon />
          Cerrar seccion
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
