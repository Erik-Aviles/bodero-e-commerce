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
      <Link className="btn-primary " href={"/products/new"}>
        Agregar producto
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>No</td>
            <td>Nombre del Producto</td>
            <td className="tb-group">Opciones</td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product, index) => (
              <tr key={product?._id}>
                <td>{index + 1}</td>
                <td>{product?.name}</td>
                <td className="tb-group">
                  <Link
                    className="btn-primary"
                    href={"/products/edit/" + product._id}
                  >
                    <EditIcon />
                    <span className="hidden sm:block">Editar</span>
                  </Link>
                  <Link
                    className="btn-delete"
                    href={"/products/delete/" + product._id}
                  >
                    <DeleteIcon />
                    <span className="hidden sm:block">Eliminar</span>
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
