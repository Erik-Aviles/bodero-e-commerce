import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartDashboard from "@/components/CartDashboard";
import { PlusIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { moogoseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Button } from "@nextui-org/react";
import productImage from "@/public/images/manitos-caja.png";
import categoryImage from "@/public/images/categorias.png";
import userImage from "@/public/images/usuarios.png";
import orderImage from "@/public/images/pedidos.png";
import { Order } from "@/models/Order";

export default function Home({ sizeProducts, sizeCategories, sizeOrders }) {
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
              <Button
                href={"/products/new"}
                as={Link}
                color="primary"
                startContent={<PlusIcon />}
              >
                Producto
              </Button>
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
                  itemCount={sizeProducts}
                />
                <CartDashboard
                  href={"/categories"}
                  title={"Categorias"}
                  imageSrc={categoryImage}
                  altText={"cajita de productos"}
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

export async function getServerSideProps() {
  await moogoseConnect();
  const categories = await Category.find({}, null, {
    sort: { _id: -1 },
  });
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
  });
  const orders = await Order.find({}, null, {
    sort: { _id: -1 },
  });
  const sizeProducts = products?.length;
  const sizeCategories = categories?.length;
  const sizeOrders = orders?.length;

  return {
    props: {
      sizeProducts: sizeProducts,
      sizeCategories: sizeCategories,
      sizeOrders: sizeOrders,
    },
  };
}
