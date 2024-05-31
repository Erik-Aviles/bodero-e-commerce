import { useState } from "react";
import ProductEditForm from "./ProductEditForm";
import { EdithIcon } from "./Icons";
import { Tooltip } from "@nextui-org/react";

const ModalEditProducts = ({ product, fetchProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        <Tooltip color="primary" content="Editar">
          <span className="text-lg text-primary cursor-pointer active:opacity-50">
            <EdithIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
          </span>
        </Tooltip>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 ">
              <div className="max-w-5xl max-h-[calc(100vh-100px)] lg:h-fit bg-grayLight p-4 rounded-lg shadow-lg overflow-auto">
                <ProductEditForm
                  titulo="Editar producto"
                  product={product}
                  toggleModal={toggleModal}
                  fetchProducts={fetchProducts}
                />
              </div>
              <div className="p-2 bg-gray-100 flex justify-end rounded-lg shadow-lg"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalEditProducts;
