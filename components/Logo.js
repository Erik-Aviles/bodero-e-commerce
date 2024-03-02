import Image from "next/image";
export default function Logo({ className }) {
  return (
    <Image
      width={500}
      height={500}
      className={`object-cover ${className}`}
      alt="Logo B.D.R"
      src="/assets/logo.jpg"
    />
  );
}
