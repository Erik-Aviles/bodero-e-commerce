import React from "react";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProducto() {
  return (
    <Layout>
      <h3>Nuevo producto</h3>
      <ProductForm />
    </Layout>
  );
}
