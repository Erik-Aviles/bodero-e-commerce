import CustomerContext from "@/context/CustomerContext";
import { useContext } from "react";

const useCustomers = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomers debe usarse dentro de un CustomerProvider");
  }

  return context;
};

export default useCustomers;
