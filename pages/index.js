import Head from "next/head";
import { useSession } from "next-auth/react";
import CartDashboard from "@/components/CartDashboard";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { moogoseConnect } from "@/lib/mongoose";
import productImage from "@/public/images/dashboard/manitos-caja.png";
import categoryImage from "@/public/images/dashboard/categorias.png";
import userImage from "@/public/images/dashboard/usuarios.png";
import orderImage from "@/public/images/dashboard/pedidos.png";
import { Order } from "@/models/Order";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { data: sizeProducts, isLoading: isLoadProduct } = useSWR(
    "/api/products/size",
    fetcher
  );
  const { data: sizeCategories, isLoading: isLoadCategory } = useSWR(
    "/api/categories/size",
    fetcher
  );
  const { data: sizeOrders, isLoading: isLoadOrders } = useSWR(
    "/api/orders/size",
    fetcher
  );
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Panel de control | Inicio</title>
      </Head>
      <Layout>
        <div className="flex flex-col lg:gap-10">
          <div className="h-fit max-w-screen-xl px-4 pb-4 sm:pb-0 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row  md:items-center lg:justify-between ">
              <div className="flex flex-col my-4 gap-1 sm:my-4 items-center">
                <h1 className="overflow-ellipsis whitespace-nowrap text-lg x:text-xl  xs:text-2xl leading-5 font-bold text-black/90 sm:text-3xl uppercase">
                  Bodero racing Development
                </h1>

                <p className="sm:px-6 text-base text-black/70 max-w-lg">
                  Sistema de visualizacion y registro de la información.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:flex sm:items-center  ">
            <div className="w-full pt-2.5 ">
              <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 ">
                <CartDashboard
                  href={"/products"}
                  title={"Productos"}
                  imageSrc={productImage}
                  altText={"cajita de productos"}
                  isLoading={isLoadProduct}
                  itemCount={sizeProducts}
                />
                <CartDashboard
                  href={"/categories"}
                  title={"Categorias"}
                  imageSrc={categoryImage}
                  altText={"cajita de productos"}
                  isLoading={isLoadCategory}
                  itemCount={sizeCategories}
                />
                <CartDashboard
                  href={"#"}
                  title={"Usuarios"}
                  imageSrc={userImage}
                  altText={"cajita de usuarios"}
                  itemCount={"1"}
                />
                <CartDashboard
                  href={"/orders"}
                  title={"Pedidos"}
                  imageSrc={orderImage}
                  altText={"una cajita con una lista"}
                  isLoading={isLoadOrders}
                  itemCount={sizeOrders}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
