import { CheckIcon, WarningIcon } from "./Icons";

export function Notification({ status, msj }) {
  return (
    <div
      role="alert"
      className="fixed min-w-[260px] border rounded-xl border-gray-300 bg-white p-4  
       top-1/2 left-1/2 lg:top-[10%] lg:left-[60%] transform -translate-x-1/2 -translate-y-1/2 z-20 duration-[2000ms]"
    >
      <div className="flex items-start gap-4 text-sm">
        <span>
          {status === "success" ? (
            <CheckIcon fill="#a3f958" width="2rem" height="2rem" />
          ) : (
            <WarningIcon fill="#f50b0c" width="2rem" height="2rem" />
          )}
        </span>

        <strong className="block font-medium text-gray-900  lg:text-2xl">
          {msj}
        </strong>
      </div>
    </div>
  );
}
