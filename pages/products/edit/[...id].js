import ProductForm from "@/components/ProductForm";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);
  return (
    <>
      <Head>
        <title>Panel | Editar producto</title>
        <meta
          name="description"
          content="Repuestos Originales  en diferentes marcas que hacen la diferencia"
        />
      </Head>
      <Layout>
        <h3>Editar producto</h3>
        {productInfo && <ProductForm {...productInfo} />}
      </Layout>
    </>
  );
}
