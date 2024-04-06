import React from "react";
import { useSession } from "next-auth/react";
import { justFirstWord } from "@/utils/justFirstWord";

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <header className="fixed z-30 sm:z-10 md:relative bg-white w-full px-4 pb-4  sm:px-6 lg:px-8">
        <hr className="h-px border-0 bg-gray-300" />

        <div className="flex items-center pt-4 sm:justify-between sm:gap-4">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Bienvenid@{" "}
            {session?.user?.name
              ? ", " + justFirstWord(session?.user?.name)
              : ""}
            !
          </h1>
          <div className=" flex flex-1 items-center gap-8 justify-end">
            <article className="group flex shrink-0 items-center rounded-lg transition">
              <img
                width={40}
                height={40}
                alt={session?.user?.name}
                src={session?.user?.image}
                className="h-10 w-10 rounded-full object-cover "
              />
              <p className="ms-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium">
                  {session?.user?.name}
                </strong>
                <span className="text-grayDark">{session?.user?.email}</span>
              </p>
            </article>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
