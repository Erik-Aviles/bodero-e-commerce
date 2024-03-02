import { Notification } from "@/components/Notification";
import { createContext, useState } from "react";

export const NotificationContext = createContext({});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    msj: "Ha ocurrido un error!",
    status: "error" || "success" || null,
  });

  const showNotification = (props) => {
    if (props) {
      setNotification(props);
      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null });
      }, 3000);
    }
  };

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open && (
        <>
          <Notification status={notification.status} msj={notification.msj} />
        </>
      )}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
