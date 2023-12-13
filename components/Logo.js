import Link from "next/link";
import React from "react";
import { StoreIcon } from "./Icons";

const Logo = ({ className }) => {
  return (
    <Link href={"/"} className={`flex gap-1 ${className}`}>
      <StoreIcon />
      <span>Admin</span>
    </Link>
  );
};

export default Logo;
