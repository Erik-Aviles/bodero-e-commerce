const columnsSalesHistoryProdutc = [
  { name: "CLIENTE", uid: "customer" },
  { name: "FECHA", uid: "updatedAt" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "PRECIO VENTA", uid: "price" },
  { name: "NUMERO DE ORDEN", uid: "order" },
];
const columnsBrands = [
  { name: "ORDEN", uid: "sort" },
  { name: "NOMBRE", uid: "name" },
  { name: "IMAGEN", uid: "image" },
  { name: "ACCION", uid: "actions" },
];

const columnsBanners = [
  { name: "ORDEN", uid: "sort" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "IMAGEN", uid: "image" },
  { name: "ACCION", uid: "actions" },
];

const columnsDebts = [
  { name: "ESTADO", uid: "status" },
  { name: "CLIENTE", uid: "customer" },
  { name: "MONTO", uid: "amount" },
  { name: "ABONOS", uid: "payments" },
  { name: "PAGADO", uid: "pay" },
  { name: "SALDO", uid: "debtBalance" },
  { name: "CONCEPTO", uid: "concept" },
  { name: "VEHICULO", uid: "vehicle" },
  { name: "DOCUMENTO", uid: "document" },
  { name: "ACCION", uid: "actions" },
];

const columnsRolesPermissions = [
  { name: "Nombre del Rol", uid: "name" },
  { name: "Permisos", uid: "permissions" },
  { name: "OBSERVACION", uid: "observation" },
  { name: "ACCION", uid: "actions" },
];

const columnsCriticalStock = [
  { name: "ESTADO", uid: "status" },
  { name: "Nombre del producto", uid: "title" },
  { name: "Código", uid: "code" },
  { name: "Stock Actual", uid: "quantity", sortable: true },
  { name: "Nuevo Stock", uid: "lastquantity", sortable: true },
  { name: "ACCION", uid: "actions" },
];

const columnsBarCode = [
  { name: "ESTADO", uid: "status" },
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
  { name: "Imagen", uid: "image" },
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
  columnsCriticalStock,
  columnsRolesPermissions,
  columnsDebts,
  columnsBanners,
  columnsBrands,
  columnsSalesHistoryProdutc,
};
