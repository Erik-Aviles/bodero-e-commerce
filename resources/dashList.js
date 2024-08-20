import productImage from "@/public/images/dashboard/manitos-caja.png";
import barcodeImage from "@/public/images/dashboard/bar-code.png";
import categoryImage from "@/public/images/dashboard/categorias.png";
import userImage from "@/public/images/dashboard/usuarios.png";
import clientImage from "@/public/images/dashboard/customers.png";
import orderImage from "@/public/images/dashboard/venta.png";
import ordersListImage from "@/public/images/dashboard/pedidos.png";

export const dashList = [
  {
    id: "0",
    title: "productos",
    href: "/products",
    alt: "Cajita de productos",
    src: productImage,
  },
  {
    id: "1",
    title: "bar codes",
    href: "/bar-code",
    alt: "Cajita de codigos de barra",
    src: barcodeImage,
  },
  {
    id: "2",
    title: "categorias",
    href: "/categories",
    alt: "Cajita de categorias",
    src: categoryImage,
  },
  {
    id: "6",
    title: "pedidos",
    href: "/orderslist",
    alt: "Cajita de pedidos",
    src: ordersListImage,
  },
  {
    id: "5",
    title: "ventas",
    href: "/orders",
    alt: "Cajita de ventas",
    src: orderImage,
  },
  {
    id: "4",
    title: "clientes",
    href: "/customers",
    alt: "Cajita de clientes",
    src: clientImage,
  },
  {
    id: "3",
    title: "usuarios",
    href: "/users",
    alt: "Cajita de usuarios",
    src: userImage,
  },
];
