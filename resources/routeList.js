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
} from "@/components/Icons";

export const routeList = [
  { id: "1", route: "Dashboard", path: "/", icon: <HomeIcon /> },

  { id: "4", route: "Inventario", path: "inventory", icon: <InventoryIcon /> },
  {
    id: "4a",
    route: "Productos",
    path: "/inventory/products",
    icon: <ProductIcon />,
  },
  {
    id: "4b",
    route: "Categorias",
    path: "/inventory/categories",
    icon: <ListCategoryIcon />,
  },
  {
    id: "4c",
    route: "Stock Crítico",
    path: "/inventory/critical-stock",
    icon: <StockDownIcon />,
  },
  {
    id: "4d",
    route: "Bar Code",
    path: "/inventory/bar-code",
    icon: <BarCodeIcon />,
  },

  {
    id: "6",
    route: "Negocio",
    path: "business",
    icon: <BusinessIcon />,
  },
  {
    id: "2a",
    route: "Pedidos",
    path: "/business/orderslist",
    icon: <OrderListIcon />,
  },
  { id: "3b", route: "Ventas", path: "/business/orders", icon: <OrderIcon /> },
  {
    id: "5",
    route: "Administración",
    path: "admin",
    icon: <AdminIcon />,
  },
  {
    id: "5a",
    route: "Clientes",
    path: "/admin/customers",
    icon: <ClientsIcon />,
  },
  {
    id: "5b",
    route: "Usuarios",
    path: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    id: "5c",
    route: "Sistema",
    path: "/admin/system",
    icon: <SystemIcon />,
  },
];
