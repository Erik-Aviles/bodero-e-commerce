import { useState } from "react";
import { EdithIcon} from "../Icons";
import { Tooltip } from "@nextui-org/react";
import CompanyForm from "../forms/CompanyForm";

const ModalCompany = ({ company, mutateGeneral }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div>
        <Tooltip color="primary" content="Editar empresa">
          <span className="text-lg text-primary cursor-pointer active:opacity-50">
            <EdithIcon className=" w-[22px] h-[22px]" onClick={toggleModal} />
          </span>
        </Tooltip>

        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 ">
              <div className="max-w-5xl max-h-[calc(100vh-100px)] lg:h-fit bg-white p-4 rounded-lg shadow-lg overflow-auto scroll">
                <CompanyForm
                  company={company}
                  mutateGeneral={mutateGeneral}
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

export default ModalCompany;
