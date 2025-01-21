import React, { useState } from "react";
import { DeleteIcon, EyeIcon } from "../Icons";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { Tooltip } from "@nextui-org/react";
import ButtonClose from "../buttons/ButtonClose";
import { calcularTotal } from "@/utils/order/calculations";

const ShowOrderDetail = ({ order }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const toggleModal = () => {
    setShowOrderModal(!showOrderModal);
  };



  // Obtener el total
  const total = calcularTotal(order.line_items);

  const iva = total * 0.15;
  // Calcular el restante
  const subtotal = total - iva;

  return (
    <div>
      <div>
        <Tooltip className="text-yellow" content="Ver Detalles">
          <span className="text-lg text-yellow cursor-pointer active:opacity-50">
            <EyeIcon className=" w-6 h-6" onClick={toggleModal} />
          </span>
        </Tooltip>
        {showOrderModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="max-h-[calc(100vh-100px)] bg-white max-w-[500px] p-4 rounded-lg shadow-lg overflow-auto scroll">
                <header className=" flex justify-end pb-2">
                  <ButtonClose onClick={toggleModal} />
                </header>
                <div className=" flex justify-between items-center mb-4 md:mb-6">
                  {/* Logo de la empresa */}
                  <img src="/logo.jpg" alt="Logo" className="h-12 sm:h-18" />
                  {/* Información de la empresa */}
                  <div className="text-right leading-4">
                    <p className="font-bold text-xs md:text-sm">
                      Bodero Racing Development
                    </p>
                    <p className="text-[10px] md:text-xs">
                      Av. Walter Andrade, San José y c. primera
                    </p>
                    <p className="text-[10px] md:text-xs">
                      Teléfono: 0996501072
                    </p>
                  </div>
                </div>

                {/* Encabezado de la factura */}
                <div className="flex items-center gap-1 sm:gap-3">
                  <div className="flex flex-col gap-2 w-full mb-4 md:mb-6">
                    <div className="leading-[12px]">
                      <p className="text-gray-600 text-[10px] md:text-xs">
                        Comprobante #:{" "}
                        <span className="font-bold">{order._id}</span>
                      </p>
                      <p className="text-gray-600 text-[10px] md:text-xs">
                        Fecha:{" "}
                        <span className="font-bold">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className="leading-[10px]">
                      <h5 className="text-xs">Dtos del cliente</h5>
                      <p className="text-gray-600 text-[10px]">
                        {"Nombre: "}
                        <span className="font-semibold capitalize">
                          {order.name}
                        </span>
                      </p>
                      <p className="text-gray-600 text-[10px]">
                        {"Cell: "}
                        <span className="font-semibold">{order.phone}</span>
                      </p>
                      <p className="text-gray-600 text-[10px]">
                        {"Email: "}
                        <span className="font-semibold">{order.email}</span>
                      </p>
                      <p className="text-gray-600 text-[10px]">
                        {"País/Cdad: "}
                        <span className="font-semibold capitalize">
                          {order.country} - {order.city}
                        </span>
                      </p>
                      <p className="text-gray-600 text-[10px] ">
                        {"Dir: "}
                        <span className="font-semibold capitalize">
                          {order.streetAddress}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <h4 className="text-sm xs:text-base text-secondary md:text-xl">
                      NOTA DE VENTA
                    </h4>
                  </div>
                </div>

                {/* Detalle de la orden*/}
                <table className="w-full mb-1 md:mb-2 border-collapse border-gray-200 border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 text-xs md:text-sm">
                        Artículo
                      </th>
                      <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 text-xs md:text-sm">
                        Precio
                      </th>
                      <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 text-xs md:text-sm">
                        Cant.
                      </th>
                      <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 text-xs md:text-sm">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.line_items.map((pro, index) => (
                      <tr key={index}>
                        <td className="p-2 md:py-2 md:px-4 border border-gray-200 text-[10px] md:text-xs capitalize">
                          {pro.info_order.product_data.name}
                          <br />
                          <span className="p-1 text-[9px] font-bold">
                            Cod: {pro.info_order.product_data.code}
                          </span>
                        </td>
                        <td className="p-2 md:py-2 md:px-4 border border-gray-200 text-[10px] md:text-xs">
                          {formatToCurrency(pro.info_order.product_data.price)}
                        </td>
                        <td className="p-2 md:py-2 md:px-4 border border-gray-200 text-[10px] md:text-xs">
                          {pro.quantity}
                        </td>
                        <td className="p-2 md:py-2 md:px-4 border border-gray-200 text-[10px] md:text-xs text-right">
                          {formatToCurrency(pro.info_order.unit_amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totales */}
                <div className="w-full flex justify-end">
                  <div className="w-32 text-right border border-gray-200 py-2 pl-4 pr-5 ">
                    <p className="text-gray-600 text-[10px] md:text-xs">
                      Subtotal:
                    </p>
                    <p className="text-gray-600 text-[10px] md:text-xs">
                      Descuento (0%):
                    </p>
                    <p className="text-gray-600 text-[10px] md:text-xs">
                      IVA (15%):
                    </p>
                    <p className="font-semibold text-xs md:text-sm">
                      Total a pagar:
                    </p>
                  </div>
                  <div className="w-24 text-right border border-gray-200 py-2 pl-4 pr-2 md:pr-5">
                    <p className="text-[10px] md:text-xs">
                      ${subtotal.toFixed(2)}
                    </p>
                    <p className="text-[10px] md:text-xs">${0}</p>
                    <p className="text-[10px] md:text-xs">${iva.toFixed(2)}</p>
                    <p className="font-semibold text-xs md:text-sm">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowOrderDetail;
