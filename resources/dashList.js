import productImage from "@/public/images/dashboard/manitos-caja.png";
import ordersListImage from "@/public/images/dashboard/pedidos.png";
import categoryImage from "@/public/images/dashboard/categorias.png";
import barcodeImage from "@/public/images/dashboard/bar-code.png";
import clientImage from "@/public/images/dashboard/customers.png";
import userImage from "@/public/images/dashboard/usuarios.png";
import debtsImage from "@/public/images/dashboard/debts.png";
import orderImage from "@/public/images/dashboard/venta.png";

export const dashList = [
  {
    id: "0",
    title: "productos",
    href: "/inventory/products",
    alt: "Cajita de productos",
    src: productImage,
  },
  {
    id: "1",
    title: "bar codes",
    href: "/inventory/bar-code",
    alt: "Cajita de codigos de barra",
    src: barcodeImage,
  },
  {
    id: "2",
    title: "categorias",
    href: "/inventory/categories",
    alt: "Cajita de categorias",
    src: categoryImage,
  },
  {
    id: "3",
    title: "pedidos",
    href: "/business/orderslist",
    alt: "Cajita de pedidos",
    src: ordersListImage,
  },
  {
    id: "4",
    title: "ventas",
    href: "/business/orders",
    alt: "Cajita de ventas",
    src: orderImage,
  },
  {
    id: "5",
    title: "cobranzas",
    href: "/business/debts",
    alt: "Cajita de cobranzas",
    src: debtsImage,
  },
  {
    id: "6",
    title: "clientes",
    href: "/admin/customers",
    alt: "Cajita de clientes",
    src: clientImage,
  },
  {
    id: "7",
    title: "usuarios",
    href: "/admin/users",
    alt: "Cajita de usuarios",
    src: userImage,
  },
];
