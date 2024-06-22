import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import logo from "@/public/logo.jpg";
import { Form } from "@/components/formsAuth/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import { Input } from "@/components/formsAuth/Input";
import { SubmitButton } from "@/components/formsAuth/SubmitButton";

export default function Login() {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authFetch = useAuthFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email.toLowerCase(),
      password,
    };
    startLoading();
    await authFetch({
      endpoint: "login",
      formData: data,
      redirectRoute: "/",
    });

    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Inicio de sesión</title>
      </Head>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              width={300}
              height={300}
              priority
              alt="Imagen de cuadricula azul"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <figure className="w-full flex justify-center mb-5">
                <Image
                  alt="Logo de la empresa con banderitas"
                  src={logo}
                  width={673 / 3}
                  height={286 / 3}
                />
              </figure>
              <h1 className="m-0 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl capitalize">
                "Bodero Racing Development"
              </h1>

              <div className="w-full flex flex-col items-center justify-center gap-4 ">
                <Form
                  onSubmit={handleSubmit}
                  title="Iniciar sesión"
                  description="Solo usuarios registrados y autorizados."
                >
                  <Input
                    type="text"
                    label="Correo"
                    name="email"
                    value={email}
                    placeholder="Escribir nombre"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    name="password"
                    value={password}
                    placeholder="Escribir contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <SubmitButton buttonText="Verificar" isLoading={isLoading} />
                </Form>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
