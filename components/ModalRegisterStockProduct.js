import React, { useContext, useState } from "react";
import { DeleteIcon, StockIcon } from "./Icons";
import NotificationContext from "@/context/NotificationContext";
import axios from "axios";
import { Input, Tooltip } from "@nextui-org/react";

const ModalRegisterStockProduct = ({ product, fetchProducts }) => {
  const { showNotification } = useContext(NotificationContext);
  const [showModal, setShowOrderModal] = useState(false);

  const toggleModal = () => {
    setShowOrderModal(!showModal);
  };

  const [stock, setStock] = useState("");

  const handleChange = (e) => {
    setStock(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (product._id) {
      if (stock === "" || null || undefined) {
        showNotification({
          open: true,
          msj: `Favor ingresar un valor!`,
          status: "error",
        });
        return;
      } else {
        const _id = product._id;
        const lastquantity = (product.lastquantity = stock);
        try {
          await axios.put("/api/products/stock", { lastquantity, _id });
          fetchProducts();
          showNotification({
            open: true,
            msj: `Valor "${stock}", ingresado con exito!`,
            status: "success",
          });
          setStock("");
          toggleModal();
        } catch (error) {
          showNotification({
            open: true,
            msj: error.message,
            status: "error",
          });
        }
      }
    }
  }

  return (
    <div>
      <div>
        <Tooltip color="success" content="Registar">
          <span className="text-lg text-success cursor-pointer active:opacity-50">
            <StockIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
          </span>
        </Tooltip>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white md:w-[350px] p-4 rounded-lg shadow-lg overflow-auto">
                <header className=" flex flex-col gap-1">
                  <div className="flex justify-end items-center">
                    <button onClick={toggleModal}>
                      <DeleteIcon />
                    </button>
                  </div>
                  <h3>{"Registro de stock"}</h3>
                </header>

                {/* Cuerpo de la informacion del producto */}
                <div>
                  <div className="border-container">
                    <div className="flex gap-1 pb-2">
                      <p>Articulo:</p>
                      <span className="capitalize text-primary text-small">
                        {product?.title}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <p>Codigo:</p>{" "}
                      <span className="capitalize text-primary text-small">
                        {product?.code}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="flex flex-col items-center  gap-1">
                      <p className="block text-secondary">Stock actual:</p>
                      <p className=" text-gray-700">
                        {product?.quantity
                          ? product?.quantity +
                            (product?.quantity > 1 ? " Uds." : " U.")
                          : "0 U."}
                      </p>
                    </div>
                    <div className="flex items-center flex-col gap-1">
                      <p className="block text-secondary">Ultimo registro:</p>
                      <p className=" text-gray-700">
                        {product?.lastquantity
                          ? product?.lastquantity +
                            (product?.lastquantity > 1 ? " Uds." : " U.")
                          : "0 U."}
                      </p>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
                >
                  <div className="mb-4">
                    <Input
                      type="number"
                      name="stock"
                      value={stock}
                      placeholder="Ingrese el valor"
                      labelPlacement="outside"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:opacity-90 active:opacity-90"
                  >
                    Aplicar
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalRegisterStockProduct;
