import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

const CartDashboard = ({ href, title, src, alt, itemCount, isLoading }) => {
  return (
    <Link href={href}>
      <article className="card ml:animated-button">
        <Image
          width={80}
          height={80}
          className="object-contain h-auto"
          src={src}
          alt={alt}
        />
        <section className="flex-center flex-col gap-2 items-center">
          <h3 className="m-0">{title}</h3>
          <span>
            {isLoading || !itemCount ? (
              <ClipLoader color="#97a8bc" size={20} />
            ) : (
              <h4 className="m-0 h-7">{itemCount}</h4>
            )}
          </span>
        </section>
      </article>
    </Link>
  );
};

export default CartDashboard;
