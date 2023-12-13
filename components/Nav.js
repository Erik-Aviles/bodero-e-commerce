import React from "react";
import {
  HomeIcon,
  ListCategoryIcon,
  LogoutIcon,
  OrderIcon,
  ProductIcon,
  SettingIcon,
  StoreIcon,
  UserIcon,
} from "./Icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

const Nav = ({ show }) => {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = "flex gap-1 p-1 bg-primaryLight text-white rounded-sm ";
  const inactiveIcon = "w-6 h-6";
  const activeIcon = "w-6 h-6 text-primary";
  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside
      className={
        (show ? `left-0` : `-left-full`) +
        " bg-grayLight top-0 text-grayDark font-semibold py-4 fixed pl-2 w-full h-full md:static md:w-auto transition-all"
      }
    >
      <Logo className="mb-4 mr-4" />
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <HomeIcon className={pathname === "/" ? activeIcon : inactiveIcon} />
          Dashboard
        </Link>
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
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
          <OrderIcon
            className={pathname.includes("/orders") ? activeIcon : inactiveIcon}
          />
          Pedidos
        </Link>
        <Link
          href={"/users"}
          className={pathname.includes("/users") ? activeLink : inactiveLink}
        >
          <UserIcon
            className={pathname.includes("/users") ? activeIcon : inactiveIcon}
          />
          Usuarios
        </Link>
        <Link
          href={"/setting"}
          className={pathname.includes("/setting") ? activeLink : inactiveLink}
        >
          <SettingIcon
            className={
              pathname.includes("/setting") ? activeIcon : inactiveIcon
            }
          />
          Configuracion
        </Link>
        <button className={inactiveLink} onClick={logout}>
          <LogoutIcon />
          Salir
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
