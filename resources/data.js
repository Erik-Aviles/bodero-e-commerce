const taxToChoose = [
  { id: "a1", value: "0", tax: "0%" },
  { id: "b1", value: "12", tax: "12%" },
  { id: "c1", value: "15", tax: "15%" },
];

const profitabilityToChoose = [
  { value: "0", profitability: "0%" },
  { value: "5", profitability: "5%" },
  { value: "10", profitability: "10%" },
  { value: "15", profitability: "15%" },
  { value: "20", profitability: "20%" },
  { value: "25", profitability: "25%" },
  { value: "30", profitability: "30%" },
  { value: "35", profitability: "35%" },
  { value: "40", profitability: "40%" },
  { value: "45", profitability: "45%" },
  { value: "50", profitability: "50%" },
  { value: "55", profitability: "55%" },
  { value: "60", profitability: "60%" },
  { value: "65", profitability: "65%" },
  { value: "70", profitability: "70%" },
  { value: "75", profitability: "75%" },
  { value: "80", profitability: "80%" },
  { value: "85", profitability: "85%" },
  { value: "90", profitability: "90%" },
  { value: "95", profitability: "95%" },
];

const columnsOrder = [
  { name: "CLIENTE", uid: "name" },
  { name: "FECHA", uid: "createdAt" },
  { name: "MONTO", uid: "amount" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "APROBADO", uid: "paid" },
  { name: "ACCION", uid: "actions" },
];

const columnsCategory = [
  { name: "NOMBRE", uid: "name" },
  { name: "FECHA", uid: "createdAt" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

const columnsProduct = [
  // { name: "ID", uid: "id" },
  { name: "Articulo", uid: "title", sortable: true },
  { name: "Imagen", uid: "images" },
  { name: "Fechas", uid: "createdAt" },
  { name: "Codigo", uid: "code", sortable: true },
  { name: "P. Costo", uid: "price", sortable: true },
  { name: "P. Neto", uid: "netPrice", sortable: true },
  { name: "P. Venta", uid: "salePrice", sortable: true },
  { name: "P. oferta", uid: "offerPrice" },
  { name: "Color", uid: "color" },
  { name: "Tamaño", uid: "size" },
  { name: "Utilidad", uid: "profit" },
  { name: "Stock", uid: "quantity", sortable: true },
  { name: "Ubicación", uid: "location" },
  { name: "Compatibilidad", uid: "compatibility" },
  { name: "Descripción", uid: "description" },
  { name: "Desc. Adicional", uid: "descriptionAdditional" },
  { name: "Acción", uid: "actions" },
];

export {
  profitabilityToChoose,
  taxToChoose,
  columnsProduct,
  columnsCategory,
  columnsOrder,
};
