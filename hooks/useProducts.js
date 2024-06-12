import ProductContext from "@/context/ProductContext";
import { useContext } from "react";

const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductProvider");
  }

  return context;
};

export default useProducts;
