export const getStockStatus = (quantity) => {
  if (quantity === 0) return "agotado";
  if (quantity <= 2) return "critico";
  if (quantity === 3) return "bajo";
  return "";
};
