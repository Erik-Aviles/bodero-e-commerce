import { PendingIcon, VerifyIcon } from "@/components/Icons";

export const statusColorMap = {
  true: "text-success border-success",
  false: "text-error border-error",
};
export const statusSVGMap = {
  true: <VerifyIcon size={15} />,
  false: <PendingIcon size={15} />,
};
