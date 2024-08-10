import { Notification } from "@/components/Notification";
import { createContext, useState } from "react";

export const NotificationContext = createContext({});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    msj: "Ha ocurrido un error!",
    status: "warning" || "error" || "success" || null,
    time: 3000,
  });

  const showNotification = (props) => {
    if (props) {
      setNotification(props);
      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null, time: 3000 });
      }, notification.time);
    }
  };

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open && (
        <>
          <Notification
            status={notification.status}
            msj={notification.msj}
            open={notification.open}
          />
        </>
      )}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
