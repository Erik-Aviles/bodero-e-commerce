import Head from "next/head";

const Loading = () => {
  return (
    <>
      <Head>
        <title>Cargando...</title>
      </Head>
      <div
        className="position-fixed w-screen h-screen text-center loading"
        style={{
          background: "#0008",
          color: "white",
          top: 0,
          left: 0,
          zIndex: 9,
        }}
      >
        <svg width="205" height="250" viewBox="0 0 40 50">
          <polygon
            strokeWidth="1"
            stroke="#fff"
            fill="none"
            points="20,1 40,40 1,40"
          ></polygon>
          <text fill="#fff" x="5" y="50">
            Cargando
          </text>
        </svg>
      </div>
    </>
  );
};

export default Loading;
