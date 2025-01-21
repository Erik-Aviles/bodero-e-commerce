export const calcularTotal = (lineItems) => {
  return lineItems?.reduce(
    (total, pro) => total + pro.info_order.unit_amount,
    0
  );
};

export const calcularQuantity = (lineItems) => {
  return lineItems?.reduce((total, pro) => total + pro.quantity, 0);
};
