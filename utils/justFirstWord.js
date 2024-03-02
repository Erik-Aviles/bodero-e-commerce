export function justFirstWord(cadena) {
  // Dividir la cadena en palabras
  var palabras = cadena.split(" ");

  // Extraer la primera palabra
  var primeraPalabra = palabras.shift(1);

  return primeraPalabra;
}
