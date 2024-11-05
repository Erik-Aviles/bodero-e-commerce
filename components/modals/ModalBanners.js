import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { AddIcon, EdithIcon } from "../Icons";
import BannerForm from "../forms/BannerForm";
import { capitalize } from "@/utils/utils";

const ModalBanners = ({ banner, mutateBanner, companyId }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        {!banner ? (
          <Tooltip color="success" content="Agregar Banner">
            <span className="text-lg text-success cursor-pointer active:opacity-50">
              <AddIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
            </span>
          </Tooltip>
        ) : (
          <Tooltip color="primary" content="Editar Banner">
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
                <BannerForm
                  titulo={!banner ? "Agregar Banner" : "Editar Banner"}
                  textSmall={
                    !banner
                      ? "Los campos con (*) son obligatorios. "
                      : `Editar el banner: "${capitalize(
                          banner?.description
                        )}" `
                  }
                  banner={banner}
                  companyId={companyId}
                  toggleModal={toggleModal}
                  mutateBanner={mutateBanner}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalBanners;
