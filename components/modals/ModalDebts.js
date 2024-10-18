import React, { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { EdithIcon, PlusIcon } from "../Icons";
import DebtForm from "../forms/DebtForm";
import { capitalize } from "@/utils/utils";

const ModalDebts = ({ debt, focusInput }) => {
  const [showModal, setShowOrderModal] = useState(false);

  const toggleModal = () => {
    setShowOrderModal(!showModal);
    if (showModal) {
      focusInput();
    }
  };

  return (
    <div>
      <div>
        {!debt ? (
          <section className="w-fit md:py-0">
            <Button
              onClick={toggleModal}
              color="primary"
              startContent={<PlusIcon />}
            >
              Agregar Deuda
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
                <DebtForm
                  titulo={
                    !debt ? "Registrar deuda" : "Editar deuda o realizar Abono"
                  }
                  textSmall={
                    !debt
                      ? "Los campos con (*) son obligatorios. "
                      : `Editar la deuda de: "${capitalize(debt?.customer)} `
                  }
                  debt={debt}
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

export default ModalDebts;
