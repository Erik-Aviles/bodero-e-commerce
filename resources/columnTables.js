const columnsBarCode = [
  { name: "Nombre del producto", uid: "title" },
  { name: "Código", uid: "code" },
  { name: "Código de barra", uid: "barCode" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "ACCION", uid: "actions" },
];
const columnsOrder = [
  { name: "ESTADO", uid: "paid" },
  { name: "CLIENTE", uid: "name" },
  { name: "FECHA", uid: "createdAt" },
  { name: "MONTO", uid: "amount" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "ACCION", uid: "actions" },
];
const columnsOrdersList = [
  { name: "ESTADO", uid: "delivered" },
  { name: "CLIENTE", uid: "customer" },
  { name: "ARTICULOS", uid: "articulo" },
  { name: "FECHA DE PEDIDO", uid: "orderEntryDate" },
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
const columnsCustomer = [
  { name: "Acción", uid: "actions" },
  { name: "Nombres", uid: "name", sortable: true },
  { name: "Cédula", uid: "identifications" },
  { name: "Fechas", uid: "createdAt" },
  { name: "Dirección", uid: "address" },
  { name: "Teléfono", uid: "phone" },
  { name: "Vehículos", uid: "myVehicles_list" },
  // { name: "Pedidos", uid: "myProductOrder_list" },
  { name: "Compras", uid: "myShopping_list" },
  { name: "Observaciones", uid: "observations" },
];
const columnUser = [
  { name: "Acción", uid: "actions" },
  { name: "Nombres", uid: "fullname", sortable: true },
  { name: "Fechas", uid: "createdAt" },
  { name: "Rol", uid: "role" },
];

export {
  columnsProduct,
  columnsCategory,
  columnsOrder,
  columnsOrdersList,
  columnsCustomer,
  columnUser,
  columnsBarCode,
};
