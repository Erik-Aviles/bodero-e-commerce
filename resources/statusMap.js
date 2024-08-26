import { ErrorIcon, VerifyIcon } from "@/components/Icons";

export const statusColorMap = {
  true: "text-success border-success",
  false: "text-error border-error",
};
export const statusSVGMap = {
  true: <VerifyIcon size={15} />,
  false: <ErrorIcon size={15} />,
};

export const statusColorQuantityMap = {
  bajo: "text-yellow border-yellow ",
  critico: "text-warning border-warning ",
  agotado: "text-error border-error ",
};

export const statusColorTextMap = {
  bajo: "text-yellow",
  critico: "text-warning ",
  agotado: "text-error ",
};
export const statusColorDotMap = {
  bajo: "bg-yellow border-yellow ",
  critico: "bg-warning border-warning ",
  agotado: "bg-error border-error ",
};

export const statusOptions = [
  { name: "bajo", uid: "bajo" },
  { name: "critico", uid: "critico" },
  { name: "agotado", uid: "agotado" },
];
