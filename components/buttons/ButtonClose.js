import React from "react";
import { DeleteIcon } from "../Icons";

const ButtonClose = ({ onClick }) => {
  return (
    <div className="flex justify-end items-center hover:text-black">
      <button onClick={onClick}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ButtonClose;
