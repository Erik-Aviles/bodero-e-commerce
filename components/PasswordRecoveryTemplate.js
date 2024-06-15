import { Cursor } from "mongoose";
import * as React from "react";

export const PasswordRecoveryTemplate = ({ buttonUrl }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "white",
      display: "grid",
      justifyItems: "center",
    }}
  >
    <span style={{ textAlign: "center" }}>
      Haz click aquí para cambiar de contraseña 👇🏻
    </span>
    <a href={buttonUrl} style={{ margin: "10px auto", cursor: " pointer" }}>
      <button>Cambiar contraseña</button>
    </a>
  </div>
);
