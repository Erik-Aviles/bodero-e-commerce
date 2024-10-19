import {
  HomeIcon,
  ListCategoryIcon,
  ClientsIcon,
  OrderListIcon,
  ProductIcon,
  UsersIcon,
  StockDownIcon,
  OrderIcon,
  BarCodeIcon,
  InventoryIcon,
  AdminIcon,
  SystemIcon,
  BusinessIcon,
  DebtsIcon,
} from "@/components/Icons";

export const routeList = [
  { id: "1", route: "Dashboard", path: "/", icon: <HomeIcon /> },

  { id: "2", route: "Inventario", path: "inventory", icon: <InventoryIcon /> },
  {
    id: "2a",
    route: "Productos",
    path: "/inventory/products",
    icon: <ProductIcon />,
  },
  {
    id: "2b",
    route: "Categorias",
    path: "/inventory/categories",
    icon: <ListCategoryIcon />,
  },
  {
    id: "2c",
    route: "Stock Crítico",
    path: "/inventory/critical-stock",
    icon: <StockDownIcon />,
  },
  {
    id: "2d",
    route: "Bar Code",
    path: "/inventory/bar-code",
    icon: <BarCodeIcon />,
  },

  {
    id: "3",
    route: "Negocio",
    path: "business",
    icon: <BusinessIcon />,
  },
  {
    id: "3a",
    route: "Pedidos",
    path: "/business/orderslist",
    icon: <OrderListIcon />,
  },
  { id: "3b", route: "Ventas", path: "/business/orders", icon: <OrderIcon /> },
  { id: "3c", route: "Cobranzas", path: "/business/debts", icon: <DebtsIcon /> },
  {
    id: "4",
    route: "Administración",
    path: "admin",
    icon: <AdminIcon />,
  },
  {
    id: "4a",
    route: "Clientes",
    path: "/admin/customers",
    icon: <ClientsIcon />,
  },
  {
    id: "4b",
    route: "Usuarios",
    path: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    id: "4c",
    route: "Sistema",
    path: "/admin/system",
    icon: <SystemIcon />,
  },
];
