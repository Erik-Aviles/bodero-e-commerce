export default function removeAccents(text) {
  const withoutAccents = text.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
  return withoutAccents.replace(/[-\/.]/g, "");
}
