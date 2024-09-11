import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useActions from "@/hooks/useActions";

const NavLink = ({ path, icon, route }) => {
  const { pathname } = useRouter();
  const { navbar, changeToggle } = useActions();
  const isActive = pathname === path;

  const linkClasses = `
  flex px-2 py-3 md:py-2 transition-colors hover:bg-[#97a8bc]/10 fill-[#9f9f9f]
  ${isActive ? "bg-primaryLight text-white hover:text-primary" : ""}
  ${navbar ? "text-[12px] flex-col items-center rounded-md" : "gap-4"}
`;

  const iconClasses = `w-6 h-6 ${isActive ? "text-primary fill-primary" : ""}`;

  return (
    <li>
      <Link href={path} className={linkClasses} onClick={changeToggle}>
        {icon && React.cloneElement(icon, { className: iconClasses })}
        {route}
      </Link>
    </li>
  );
};

export default NavLink;
