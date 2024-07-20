import { Button, Tooltip } from "@nextui-org/react";
import OrderListForm from "../forms/OrderListForm";
import { EdithIcon, PlusIcon } from "../Icons";
import { capitalize } from "@/utils/utils";
import React, { useState } from "react";

const ModalOrderListProduct = ({ order }) => {
  const [showModal, setShowOrderModal] = useState(false);

  const toggleModal = () => {
    setShowOrderModal(!showModal);
  };

  return (
    <div>
      <div>
        {!order ? (
          <section className="w-fit md:py-0">
            <Button
              onClick={toggleModal}
              color="primary"
              startContent={<PlusIcon />}
            >
              Agregar pedido
            </Button>
          </section>
        ) : (
          <Tooltip color="primary" content="Editar">
            <span className="text-lg text-primary cursor-pointer active:opacity-50">
              <EdithIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
            </span>
          </Tooltip>
        )}
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white p-4 max-w-md rounded-lg shadow-lg overflow-auto">
                <OrderListForm
                  titulo={!order ? "Registrar pedido" : "Editar Pedido"}
                  textSmall={
                    !order
                      ? "Los campos con (*) son obligatorios."
                      : `Editar el pedido: "${capitalize(
                          order?.articulo.length > 30
                            ? order?.articulo.substring(0, 30) + "..."
                            : order?.articulo
                        )}`
                  }
                  order={order}
                  toggleModal={toggleModal}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalOrderListProduct;
