import {
  HomeIcon,
  ListCategoryIcon,
  ClientsIcon,
  OrderListIcon,
  ProductIcon,
  UsersIcon,
  OrderIcon,
} from "@/components/Icons";

export const routeList = [
  { id: "1", route: "Dashboard", path: "/", icon: <HomeIcon /> },
  { id: "2", route: "Productos", path: "/products", icon: <ProductIcon /> },
  {
    id: "3",
    route: "Categorias",
    path: "/categories",
    icon: <ListCategoryIcon />,
  },
  {
    id: "4",
    route: "Lista de pedidos",
    path: "/orderslist",
    icon: <OrderListIcon />,
  },
  { id: "7", route: "Ventas", path: "/orders", icon: <OrderIcon /> },
  {
    id: "5",
    route: "Clientes",
    path: "/customers",
    icon: <ClientsIcon />,
  },
  {
    id: "6",
    route: "Usuarios",
    path: "/users",
    icon: <UsersIcon />,
  },
];
