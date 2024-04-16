import { useState } from "react";
import { PlusIcon } from "./Icons";
import { Button } from "@nextui-org/react";
import ProductNewForm from "./ProductNewForm";

const ModalNewProducts = ({ fetchProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        <Button
          title="Agregar producto"
          color="primary"
          onClick={toggleModal}
          startContent={<PlusIcon />}
        >
          Producto
        </Button>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="max-h-[700px] max-w-5xl bg-grayLight p-4 rounded-lg shadow-lg overflow-auto">
                <ProductNewForm
                  titulo="Registrar producto"
                  toggleModal={toggleModal}
                  fetchProducts={fetchProducts}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalNewProducts;
