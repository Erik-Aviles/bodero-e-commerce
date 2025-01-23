import useActions from "@/hooks/useActions";
import React from "react";
import ModalCompany from "../modals/ModalCompany";
import { useCompany } from "@/hooks/useCompany";
import { Tooltip } from "@nextui-org/react";
import Spinner from "../snnipers/Spinner";
import { UpArrowIcon } from "../Icons";

const CompanyInformation = () => {
  const { company, isLoadingGeneral, mutateGeneral } = useCompany();

  const { changeOpcCompany, opcCompany } = useActions();
  return (
    <section
      className={`p-5 bg-white shadow-lg rounded-lg transition-all duration-500 ${
        opcCompany ? " bg-white/70 border-l-4 border-warning" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
            Información de la empresa
          </h4>
          <ModalCompany company={company} mutateGeneral={mutateGeneral} />
        </div>

        <Tooltip
          color="warning"
          content={!opcCompany ? "Expandir" : "Contraer"}
        >
          <span
            className="border-1 border-warning p-2 text-lg cursor-pointer active:opacity-50"
            onClick={changeOpcCompany}
          >
            <UpArrowIcon
              className={`w-3 h-3 fill-[#ff6e01] stroke-[#ff6e01]  transition-transform duration-700 ${
                opcCompany ? "rotate-180" : ""
              }`}
              style={{ color: opcCompany ? "#3b82f6" : "#6b7280" }}
            />
          </span>
        </Tooltip>
      </div>

      {opcCompany && (
        <div className="text-sm border-b-1 py-2 border-gray-200  gap-5 transition-all duration-500">
          {isLoadingGeneral || !company ? (
            <Spinner className="pt-3 pb-3" />
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-center flex-col md:flex-row lg:justify-between gap-5">
                <div className="flex items-center lg:justify-between basis-[33%] ">
                  {/* Logo de la empresa */}
                  <div className="w-full justify-center gap-4 flex items-center md:justify-between mb-6">
                    <img
                      className="h-16 w-16 object-contain bg-white rounded-md shadow-md"
                      src={company?.mainlogo}
                      alt={`Logo de ${company?.name}`}
                    />
                    <div>
                      <h2 className="sm:text-xl font-bold text-gray-800 uppercase">
                        {company?.name}
                      </h2>
                      <p className="text-sm text-gray-500">{company?.motto}</p>
                    </div>
                  </div>
                </div>
                {/* Información General */}
                <div className="space-y-2 basis-[45%] ">
                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Dirección:
                    </span>
                    <span className="text-gray-800">{company?.address}</span>
                  </div>

                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Teléfono 1.:
                    </span>
                    <span className="text-gray-800">0{company?.mainPhone}</span>
                  </div>
                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Teléfono 2.:
                    </span>
                    <span className="text-gray-800">
                      0{company?.secondaryPhone}
                    </span>
                  </div>

                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Correo Electrónico:
                    </span>
                    <span className="text-gray-800">{company?.mainEmail}</span>
                  </div>

                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Sitio Web:
                    </span>
                    <a
                      href={company?.website}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {company?.website}
                    </a>
                  </div>
                </div>
                {/* Codigo QR */}
                <figure className="flex flex-col gap-2 justify-center basis-[20%]">
                  <img
                    className="h-28 w-28 object-contain mx-auto shadow-md"
                    src={company?.qrImage?.img}
                    alt={company?.qrImage?.description}
                  />
                  <figcaption className="italic text-xs text-black/80 capitalize">
                    {company?.qrImage?.description}
                  </figcaption>
                </figure>
              </div>
              <div className="flex justify-evenly basis-[20%]">
                {company?.socialMedia.length > 0 &&
                  company?.socialMedia?.map((item, index) => (
                    <a
                      key={index}
                      href={item?.link}
                      className="text-gray-500 hover:text-primary transition duration-300 capitalize"
                    >
                      <i>{item?.title}</i>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CompanyInformation;
