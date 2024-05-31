const columnsOrder = [
  { name: "APROBADO", uid: "paid" },
  { name: "CLIENTE", uid: "name" },
  { name: "FECHA", uid: "createdAt" },
  { name: "MONTO", uid: "amount" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "ACCION", uid: "actions" },
];

const columnsCategory = [
  { name: "ACTIONS", uid: "actions" },
  { name: "NOMBRE", uid: "name" },
  { name: "FECHA", uid: "createdAt" },
  { name: "DESCRIPCION", uid: "description" },
];

const columnsProduct = [
  // { name: "ID", uid: "id" },
  { name: "Acción", uid: "actions" },
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
  { name: "Stock Actual", uid: "quantity", sortable: true },
  { name: "Ult. Fecha Salida", uid: "quantityUpdated", sortable: true },
  { name: "Nuevo Stock", uid: "lastquantity", sortable: true },
  { name: "Ult. Fecha. Entrada", uid: "lastquantityUpdated", sortable: true },
  { name: "Ubicación", uid: "location" },
  { name: "Compatibilidad", uid: "compatibility" },
  { name: "Descripción", uid: "description" },
  { name: "Desc. Adicional", uid: "descriptionAdditional" },
];

export { columnsProduct, columnsCategory, columnsOrder };
