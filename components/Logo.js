import Image from "next/image";
import logo from "@/public/images/logo.jpg";

export default function Logo({ className }) {
  return (
    <Image
      width={500}
      height={500}
      src={logo}
      className={`object-cover ${className}`}
      alt="Logo B.D.R"
    />
  );
}
