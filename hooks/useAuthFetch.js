import NotificationContext from "../context/NotificationContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import axios from "axios";

export default function useAuthFetch() {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const authRouter = async ({ endpoint, formData, redirectRoute, options }) => {
    try {
      const { data } = await axios.post(`/api/${endpoint}`, formData, options);

      showNotification({ open: true, msj: data.message, status: "success" });

      if (redirectRoute) {
        setTimeout(() => {
          router.push(redirectRoute);
        }, 3000);
      }
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  };
  return authRouter;
}
