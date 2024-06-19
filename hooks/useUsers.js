import UserContext from "@/context/UserContext";
import { useContext } from "react";

const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsers debe usarse dentro de un UserProvider");
  }

  return context;
};

export default useUsers;
