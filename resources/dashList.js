import productImage from "@/public/images/dashboard/manitos-caja.png";
import categoryImage from "@/public/images/dashboard/categorias.png";
import userImage from "@/public/images/dashboard/usuarios.png";
import clientImage from "@/public/images/dashboard/customers.png";
import orderImage from "@/public/images/dashboard/venta.png";
import ordersListImage from "@/public/images/dashboard/pedidos.png";

export const dashList = [
  {
    id: "1",
    title: "productos",
    href: "/products",
    alt: "Cajita de productos",
    src: productImage,
  },
  {
    id: "2",
    title: "categorias",
    href: "/categories",
    alt: "Cajita de categorias",
    src: categoryImage,
  },
  {
    id: "3",
    title: "usuarios",
    href: "/users",
    alt: "Cajita de usuarios",
    src: userImage,
  },
  {
    id: "4",
    title: "clientes",
    href: "/customers",
    alt: "Cajita de clientes",
    src: clientImage,
  },
  {
    id: "5",
    title: "ventas",
    href: "/orders",
    alt: "Cajita de ventas",
    src: orderImage,
  },
  {
    id: "6",
    title: "pedidos",
    href: "/orderslist",
    alt: "Cajita de pedidos",
    src: ordersListImage,
  },
];
