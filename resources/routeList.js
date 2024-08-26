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
} from "@/components/Icons";

export const routeList = [
  { id: "1", route: "Dashboard", path: "/", icon: <HomeIcon /> },
  { id: "6", route: "Inventario", path: "", icon: <InventoryIcon /> },
  { id: "7", route: "Productos", path: "/products", icon: <ProductIcon /> },
  {
    id: "9",
    route: "Categorias",
    path: "/categories",
    icon: <ListCategoryIcon />,
  },
  {
    id: "10",
    route: "Stock Crítico",
    path: "/critical-stock",
    icon: <StockDownIcon />,
  },
  { id: "8", route: "Bar Code", path: "/bar-code", icon: <BarCodeIcon /> },
  {
    id: "2",
    route: "Pedidos",
    path: "/orderslist",
    icon: <OrderListIcon />,
  },
  { id: "3", route: "Ventas", path: "/orders", icon: <OrderIcon /> },
  {
    id: "4",
    route: "Clientes",
    path: "/customers",
    icon: <ClientsIcon />,
  },
  {
    id: "5",
    route: "Usuarios",
    path: "/users",
    icon: <UsersIcon />,
  },
];
