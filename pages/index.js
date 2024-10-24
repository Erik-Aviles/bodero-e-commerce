import useProductSelectionBarCode from "@/hooks/useProductSelectionBarCode";
import CartDashboard from "@/components/CartDashboard";
import { dashList } from "@/resources/dashList";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import Head from "next/head";
import useSWR from "swr";

export default function Home() {
  const { items } = useProductSelectionBarCode();
  const sizeBarcodes = items.length;

  const { data: sizeProducts, isLoading: isLoadProducts } = useSWR(
    "/api/products/size",
    fetcher
  );
  const { data: sizeCategories, isLoading: isLoadCategories } = useSWR(
    "/api/categories/size",
    fetcher
  );
  const { data: sizeUsers, isLoading: isLoadUsers } = useSWR(
    "/api/users/size",
    fetcher
  );
  const { data: sizeCustomers, isLoading: isLoadCustomers } = useSWR(
    "/api/customers/size",
    fetcher
  );
  const { data: sizeOrders, isLoading: isLoadOrders } = useSWR(
    "/api/orders/size",
    fetcher
  );
  const { data: sizeOrdersList, isLoading: isLoadOrdersList } = useSWR(
    "/api/orderslist/size",
    fetcher
  );
  const { data: sizeDebts, isLoading: isLoadDebtsList } = useSWR(
    "/api/debts/size",
    fetcher
  );

  return (
    <>
      <Head>
        <title>Panel de control | Inicio</title>
      </Head>
      <Layout>
        <div className="flex flex-col lg:gap-10 pb-4">
          <div className="h-fit max-w-screen-xl px-4 pb-4 sm:pb-0 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row  md:items-center lg:justify-between ">
              <div className="flex flex-col my-2 gap-1 sm:my-4 items-center">
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
              <div className=" grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {dashList.map(({ id, title, href, src, alt }) => (
                  <CartDashboard
                    key={id}
                    href={href}
                    title={title}
                    src={src}
                    alt={alt}
                    isLoading={
                      (title === "productos" && isLoadProducts) ||
                      (title === "bar codes" && isLoadProducts) ||
                      (title === "categorias" && isLoadCategories) ||
                      (title === "usuarios" && isLoadUsers) ||
                      (title === "clientes" && isLoadCustomers) ||
                      (title === "pedidos" && isLoadOrdersList) ||
                      (title === "ventas" && isLoadOrders) ||
                      (title === "cobranzas" && isLoadDebtsList)
                    }
                    itemCount={
                      (title === "productos" && sizeProducts) ||
                      (title === "bar codes" && sizeBarcodes) ||
                      (title === "categorias" && sizeCategories) ||
                      (title === "usuarios" && sizeUsers) ||
                      (title === "clientes" && sizeCustomers) ||
                      (title === "pedidos" && sizeOrdersList) ||
                      (title === "ventas" && sizeOrders) ||
                      (title === "cobranzas" && sizeDebts)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
