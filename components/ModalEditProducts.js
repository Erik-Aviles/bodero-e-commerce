import { useState } from "react";
import ProductEditForm from "./ProductEditForm";
import { EdithIcon } from "./Icons";

const ModalEditProducts = ({ product,fetchProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        <span title="Editar" className="w-fit">
          <EdithIcon className="cursor-pointer" onClick={toggleModal} />
        </span>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="max-h-[700px] max-w-5xl bg-grayLight p-4 rounded-lg shadow-lg overflow-auto">
                <ProductEditForm
                  titulo="Editar producto"
                  product={...product}
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

export default ModalEditProducts;
