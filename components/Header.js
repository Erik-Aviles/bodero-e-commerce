import React from "react";
import avatarLocal from "../public/images/avatar/avatarUser.png";
import { justFirstWord } from "@/utils/justFirstWord";
import { HamburguerIcon, LogoutIcon } from "./Icons";
import { useSession } from "next-auth/react";
import useActions from "@/hooks/useActions";
import logo from "@/public/logo.jpg";
import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";

const Header = () => {
  const { changeToggle, setNavbar, cerrarSesion } = useActions();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <header className="sticky top-0 z-30 md:relative bg-white w-full px-2 pt-2 md:pb-2">
        <div className="w-full bg-white md:hidden flex py-2">
          <button
            onClick={() => {
              changeToggle();
              setNavbar(true);
            }}
          >
            <HamburguerIcon className="fill-warning w-8 h-8" />
          </button>
          <div className="m-auto">
            <Link href="/" className="w-32">
              <Image alt="Logo" className="w-20" src={logo} />
            </Link>
          </div>
        </div>
        <hr className="h-[1px] border-0 bg-gray-300 md:hidden" />
        <div className="py-2 flex items-center justify-between sm:gap-4">
          <button
            className="hidden md:flex lg:hidden"
            onClick={() => {
              changeToggle();
              setNavbar(true);
            }}
          >
            <HamburguerIcon className="fill-warning w-8 h-8" />
          </button>
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            Bienvenid@
            {user?.fullname
              ? ", " + justFirstWord(user?.fullname?.toUpperCase())
              : ""}
            !
          </h1>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={user?.avatar[0] ? user?.avatar[0] : avatarLocal}
              />
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3"
              itemClasses={{
                base: ["rounded-md", "text-default-500", "transition-opacity"],
              }}
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem
                  key="profile"
                  isReadOnly
                  className="flex items-center gap-2 opacity-100"
                >
                  <span className="flex justify-center items-center">
                    <Avatar
                      isBordereds
                      className="w-20 h-20 text-large"
                      src={user?.avatar[0] ? user?.avatar[0] : avatarLocal}
                    />
                  </span>
                  <p className="font-bold text-success text-center capitalize">
                    {user?.fullname}
                  </p>
                  <p className="text-tiny text-center">{user?.email}</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="settings">
                <Link href={"/admin/system?section=account"}>
                  Informacion de mi cuenta
                </Link>
              </DropdownItem>

              <DropdownItem
                key="logout"
                startContent={<LogoutIcon />}
                color="danger"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
    </>
  );
};

export default Header;
