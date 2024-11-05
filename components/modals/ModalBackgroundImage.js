import { useState } from "react";
import { EdithIcon } from "../Icons";
import { Tooltip } from "@nextui-org/react";
import { capitalize } from "@/utils/utils";
import BackgroundImageForm from "../forms/BackgroundImageForm";

const ModalBackgroundImage = ({
  backgroundImage,
  companyId,
  mutateBackgroundImage,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        <Tooltip color="primary" content="Editar la imagen">
          <span className="text-lg text-primary cursor-pointer active:opacity-50">
            <EdithIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
          </span>
        </Tooltip>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 ">
              <div className="w-full max-w-[500px] bg-white p-4 rounded-lg shadow-lg overflow-auto scroll">
                <BackgroundImageForm
                  titulo={
                    !backgroundImage
                      ? "Agregar backgroundImage"
                      : "Editar imagen de fondo"
                  }
                  textSmall={
                    !backgroundImage
                      ? "Los campos con (*) son obligatorios. "
                      : `Editar la imagen: "${capitalize(
                          backgroundImage?.description
                        )}" `
                  }
                  backgroundImage={backgroundImage}
                  companyId={companyId}
                  toggleModal={toggleModal}
                  mutateBackgroundImage={mutateBackgroundImage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalBackgroundImage;
