import Link from "next/link";

export function Footer({ description, link, textLink }) {
  return (
    <div className="w-full flex justify-center mt-1">
      <span className="text-xs text-gray-50">
        {description}
        <Link href={link}>
          <a className="font-bold text-black no-underline cursor-pointer pl-1">
            {textLink}
          </a>
        </Link>
      </span>
    </div>
  );
}
