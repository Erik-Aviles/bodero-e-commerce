import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-red-600 flex items-center justify-between">
        <h2>
          Hola, <b>{session?.user?.name}</b>
        </h2>
        <figure className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image}
            alt={`Foto de ${session?.user?.name}`}
            className="w-6 h-6"
          />
          <span className="px-2">{session?.user?.name}</span>
        </figure>
      </div>
    </Layout>
  );
}
