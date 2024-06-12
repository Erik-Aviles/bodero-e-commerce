import CategoryContext from "@/context/CategoryContext";
import { useContext } from "react";

const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategories debe usarse dentro de un CategoryProvider");
  }

  return context;
};

export default useCategories;
