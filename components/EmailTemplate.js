import * as React from "react";

const style = {
  container: {
    padding: "20px",
    backgroundColor: "white",
    display: "grid",
    justifyItems: "center",
    border: "1px solid black",
  },
  wrapper: {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    color: "black",
    margin: 0,
    fontSize: "16px",
    textTransform: "uppercase",
  },
  textp: {
    margin: 0,
    textTransform: "capitalize",
  },
  textspan: {
    margin: 0,
    textTransform: "lowercase",
  },
};

export const EmailTemplate = ({ email, name }) => (
  <div style={style.container}>
    <div style={style.wrapper}>
      <h2 style={style.title}>BODERO RACING DEVELOPMENTE</h2>
      <img
        src="https://res.cloudinary.com/imagen-category/image/upload/v1719604443/exxoqp1fbzfgf3geqchn.jpg"
        alt="logo"
        width="60px"
      />
    </div>
    <section>
      <p style={style.textp}>El usuario, {name}</p>
      <p style={style.textp}>
        Correo: <span style={style.textspan}>{email}.</span>
      </p>
      <p style={style.textp}>
        <strong>Ha iniciado session! </strong>
      </p>
    </section>
  </div>
);
