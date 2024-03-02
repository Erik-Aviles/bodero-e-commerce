import React from "react";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";

export default function NewProducto() {
  return (
    <>
      <Head>
        <title>Panel | Registro de productos</title>
        <meta
          name="description"
          content="Registro de nuevos productos a la plataforma"
        />
      </Head>{" "}
      <Layout>
        <div className="h-fit max-w-screen-xl pb-4 ">
          <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
            <h3>Registrar productos</h3>
            <Button
              href={"/categories"}
              as={Link}
              color="primary"
              endContent={<PlusIcon />}
            >
              Agregar Categoria
            </Button>
          </div>
        </div>

        <ProductForm />
      </Layout>
    </>
  );
}
