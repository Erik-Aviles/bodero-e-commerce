export function formatPrice(price) {
  let precioFormateado = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return precioFormateado;
}
