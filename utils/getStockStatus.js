export const getStockStatus = (quantity) => {
  if (quantity === 0) return "agotado";
  if (quantity === 1) return "critico";
  if (quantity === 2) return "bajo";
  return "";
};
