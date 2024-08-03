import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useActions from "@/hooks/useActions";

const NavLink = ({ path, icon, route }) => {
  const { pathname } = useRouter();
  const { navbar } = useActions();

  const inactiveLink =
    "flex px-2 py-3 md:py-2 py-3 px-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f] ";
  const activeLink = `${inactiveLink} bg-primaryLight text-white hover:text-primary`;
  const inactiveIcon = "w-6 h-6";
  const activeIcon = `${inactiveIcon} text-primary fill-primary`;

  return (
    <li>
      <Link
        href={path}
        className={`${pathname === path ? activeLink : inactiveLink} ${
          navbar ? "text-[12px] flex-col items-center rounded-md " : "gap-4"
        }`}
      >
        {icon
          ? React.cloneElement(icon, {
              className: pathname === path ? activeIcon : inactiveIcon,
            })
          : null}
        {route}
      </Link>
    </li>
  );
};

export default NavLink;
