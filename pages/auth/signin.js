import { signIn } from "next-auth/react";
import React from "react";
import { GooglegIcon } from "@/components/Icons";
import logo from "/public/assets/logo.jpg";
import Image from "next/image";
import Head from "next/head";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>B.R.D | Inicio de sessión</title>
      </Head>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              width={500}
              height={500}
              alt="Imagen de cuadricula azul"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <Image
                width={252}
                height={252}
                src={logo}
                alt="Logo B.R.D."
                className={"m-auto"}
              />
              <h1 className="my-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Inicia sesión con tu cuenta
              </h1>

              <div className="flex w-full items-center justify-center gap-4 flex-col">
                <button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "https://bodero-e-commerce.vercel.app/",
                    })
                  }
                  className="flex items-center whitespace-nowrap justify-between gap-2 shrink-0 rounded-md border border-[#424CF8] bg-[#424CF8] px-12 py-3 text-lg font-medium text-white transition hover:bg-transparent hover:text-[#424CF8] focus:outline-none focus:ring active:text-[#424CF8]"
                >
                  <GooglegIcon className="w-7 h-7" /> Login con google
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
