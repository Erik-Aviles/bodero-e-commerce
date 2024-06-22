import SessionContext from "@/context/SessionContext";
import { useContext } from "react";

const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession debe usarse dentro de un SessionProvider");
  }

  return context;
};

export default useSession;
