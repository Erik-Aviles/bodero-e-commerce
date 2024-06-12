import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ path, icon, route }) => {
  const { pathname } = useRouter();

  const inactiveLink =
    "flex gap-2 px-2 py-3 md:py-2 text-base hover:bg-[#97a8bc]/10 fill-[#9f9f9f] ";
  const activeLink = `${inactiveLink} bg-primaryLight text-white rounded-sm`;
  const inactiveIcon = "w-7 h-7";
  const activeIcon = `${inactiveIcon} text-primary fill-primary`;

  return (
    <Link href={path} className={pathname === path ? activeLink : inactiveLink}>
      {icon
        ? React.cloneElement(icon, {
            className: pathname === path ? activeIcon : inactiveIcon,
          })
        : null}
      {route}
    </Link>
  );
};

export default NavLink;
