export const Loader = ({ size = 20 }) => {
  return (
    <div
      className="border-2 border-solid rounded-full animate-spin"
      style={{
        borderColor: "rgba(255, 0, 0, 0.5)",
        borderLeftColor: "#FFFFFF",
        width: size,
        height: size,
      }}
    />
  );
};
