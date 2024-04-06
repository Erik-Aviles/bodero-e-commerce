export function formatToCurrency(amount) {
  // Redondea el monto a dos decimales y convierte a string
  const roundedAmount = (Math.round(amount * 100) / 100).toFixed(2).toString();

  // Separa la parte entera y la parte decimal
  const [integerPart, decimalPart] = roundedAmount.split(".");

  // Formatea la parte entera con separador de miles
  let formattedAmount = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Agrega la parte decimal y el símbolo de la moneda
  formattedAmount += "." + decimalPart;

  // Agrega el símbolo de la moneda al inicio
  formattedAmount = "$" + formattedAmount;

  // Retorna la cadena de moneda
  return formattedAmount;
}
