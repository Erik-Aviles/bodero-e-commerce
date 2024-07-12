import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function PageError() {
  const { status } = useSession();

  const router = useRouter();

  const redirigir = () => {
    status === "authenticated" ? router.push("/") : router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>B.R.D | Pagina no existe</title>
      </Head>
      <section
        className={`errorpage w-screen h-screen min-w-screen min-h-screen bg-gradient-to-tl from-[#232A2F] to-[#404446] flex justify-center items-center overflow-y-auto text-center text-white font-bold `}
      >
        <div className="w-[90%] h-[90%] md:w-[60%] md:h-[70%] flex flex-col p-5 justify-center items-center bg-gray-900 bg-opacity-30 shadow-lg rounded-md">
          <h2 className="font-bold text-7xl my-5">404</h2>
          <p className="text-lg">Página no existe</p>

          <button
            type="button"
            className="block my-10 bg-white text-black cursor-pointer px-3 py-2 rounded-md hover:bg-[#EFEFEF] font-normal shadow-lg shadow-gray-900"
            onClick={redirigir}
          >
            {status === "authenticated" ? "Ir al inicio" : "Iniciar session"}
          </button>
        </div>
      </section>
    </>
  );
}
