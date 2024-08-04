export function removeAccents(text) {
  const withoutAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
  return withoutAccents.replace(/[-\/.]/g, "");
}
export function removePluralEnding(word) {
  if (word.endsWith("es")) {
    return word.slice(0, -2); // Elimina "es" al final de la palabra
  } else if (word.endsWith("s")) {
    return word.slice(0, -1); // Elimina "s" al final de la palabra
  }
  return word; // Devuelve la palabra sin cambios si no termina en "s" o "es"
}
