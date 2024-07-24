import { ActionsContext } from "@/context/actionsProvider";
import { useContext } from "react";

export default function useActions() {
  return useContext(ActionsContext);
}
