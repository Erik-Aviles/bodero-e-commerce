import React from "react";
import { DeleteIcon } from "../Icons";

const ButtonClose = ({ onClick }) => {
  return (
    <button
      type="button"
      className="w-6 h-6 flex justify-center items-center bg-black rounded-full text-white hover:bg-black/50"
      onClick={onClick}
    >
      <DeleteIcon className="hover:fill-white fill-white " />
    </button>
  );
};

export default ButtonClose;
