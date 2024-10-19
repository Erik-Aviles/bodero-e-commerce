import { useEffect, useState } from "react";
import { EdithIcon, PlusIcon } from "../Icons";
import { Button, Tooltip } from "@nextui-org/react";
import { capitalize } from "@/utils/utils";
import ProductForm from "../forms/ProductForm";

const ModalProducts = ({ product, focusInput }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      focusInput(); 
    }
  };

    useEffect(() => {
    if (!showModal && focusInput) {
      focusInput(); 
    }
  }, [showModal, focusInput]);

  return (
    <div>
      <div>
        {!product ? (
          <section className="w-fit md:py-0">
            <Button
              onClick={toggleModal}
              color="primary"
              startContent={<PlusIcon />}
            >
              Producto
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 ">
              <div className="max-w-5xl max-h-[calc(100vh-100px)] lg:h-fit bg-white p-4 rounded-lg shadow-lg overflow-auto scroll">
                <ProductForm
                  titulo={!product ? "Registrar producto" : "Editar producto"}
                  textSmall={
                    !product
                      ? "Los campos con (*) son obligatorios. "
                      : `Editar el producto "${capitalize(product?.title)} `
                  }
                  product={product}
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

export default ModalProducts;