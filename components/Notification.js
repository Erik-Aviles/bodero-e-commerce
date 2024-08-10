import { ErrorIcon, VerifyIcon, WarningIcon } from "./Icons";
import { useCallback } from "react";

export function Notification({ status, msj, open }) {
  const renderStatusIcon = useCallback((status) => {
    switch (status) {
      case "success":
        return <VerifyIcon size="3rem" />;
      case "warning":
        return <WarningIcon size="3rem" />;
      case "error":
        return <ErrorIcon size="3rem" />;
      default:
        return status;
    }
  }, []);

  return (
    <div
      role="alert"
      id="message"
      className={`fixed z-50 inset-0 flex items-center justify-center
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        transition-all duration-500 ease-out`}
    >
      <div className="bg-white border rounded-xl border-gray-300 p-4 w-[300px] max-w-[80%]">
        <div className="flex flex-col justify-center items-center gap-2">
          <span>{renderStatusIcon(status)}</span>
          <strong className="block text-center font-medium text-gray-900 ml:text-2xl ">
            {msj}
          </strong>
        </div>
      </div>
    </div>
  );
}
