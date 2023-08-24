import { DeleteIcon, EditIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <Layout>
      <Link className="btn-primary" href={"/products/new"}>
        Agregar producto
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Articulo</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product?._id}>
              <td>{product?.name}</td>
              <td>
                <Link href={"/products/edit/" + product._id}>
                  <EditIcon />
                </Link>
                <Link href={"/products/delete/" + product._id}>
                  <DeleteIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
