import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartDashboard = ({ href, title, imageSrc, altText, itemCount }) => {
  return (
    <Link href={href}>
      <article className="card ml:animated-button">
        <Image
          width={80}
          height={80}
          className="object-contain"
          src={imageSrc}
          alt={altText}
        />
        <section className="flex-center flex-col items-center">
          <h3 className="m-0">{title}</h3>
          <span>
            <h4 className="m-0">{itemCount}</h4>
          </span>
        </section>
      </article>
    </Link>
  );
};

export default CartDashboard;
