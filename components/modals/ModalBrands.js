import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { AddIcon, EdithIcon} from "../Icons";
import { capitalize } from "@/utils/utils";
import BrandsForm from "../forms/BrandsForm";

const ModalBrands = ({ brand, mutateBrand, companyId }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        {!brand ? (
        <Tooltip color="success" content="Agregar Marca">
        <span className="text-lg cursor-pointer active:opacity-50">
          <AddIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
        </span>
      </Tooltip>
        ) : (
          <Tooltip color="primary" content="Editar Marca">
            <span className="text-lg text-primary cursor-pointer active:opacity-50">
              <EdithIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
            </span>
          </Tooltip>
        )}
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 ">
              <div className="max-h-[calc(100vh-100px)] bg-white w-full max-w-[500px] p-4 rounded-lg shadow-lg overflow-auto scroll">
                <BrandsForm
                  titulo={
                    !brand ? "Agregar Marca" : "Editar Marca"
                  }
                  textSmall={
                    !brand
                      ? "Los campos con (*) son obligatorios. "
                      : `Editar la marca: "${capitalize(brand?.name)} `
                  }
                  brand={brand}
                  companyId={companyId}
                  toggleModal={toggleModal}
                  mutateBrand={mutateBrand}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalBrands;
