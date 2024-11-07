import ModalBackgroundImage from "../modals/ModalBackgroundImage";
import { useCompany } from "@/hooks/useCompany";
import useActions from "@/hooks/useActions";
import { fetcher } from "@/utils/fetcher";
import { Tooltip } from "@nextui-org/react";
import Spinner from "../snnipers/Spinner";
import { UpArrowIcon } from "../Icons";
import React from "react";
import useSWR from "swr";

const BackgroundCompanyBrands = () => {
  const { companyId } = useCompany();
  const { changeOpcBackground, opcBackground } = useActions();

  //Informacion de la imagen de fondo en las marcas
  const apiUrlBackground = companyId
    ? `/api/companies/background-image-brands?companyId=${companyId}`
    : null;

  const {
    data: background,
    isLoading: isLoadingBackgroundImage,
    mutate: mutateBackgroundImage,
  } = useSWR(apiUrlBackground, fetcher);

  const backgroundImage = background?.company?.backgroundImageBrands;
  return (
    <section
      className={`p-5 bg-white shadow-lg rounded-lg transition-all duration-500 ${
        opcBackground ? " bg-white/70 border-l-4 border-blue-400" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
            Fondo en marcas de la tienda
          </h4>
          <ModalBackgroundImage
            backgroundImage={backgroundImage}
            mutateBackgroundImage={mutateBackgroundImage}
            companyId={companyId}
          />
        </div>
        <Tooltip
          color="warning"
          content={!opcBackground ? "Expandir" : "Contraer"}
        >
          <span
            className="border-1 border-warning p-2 text-lg cursor-pointer active:opacity-50"
            onClick={changeOpcBackground}
          >
            <UpArrowIcon
              className={`w-3 h-3 fill-[#ff6e01] stroke-[#ff6e01]  transition-transform duration-700 ${
                opcBackground ? "rotate-180" : ""
              }`}
              style={{ color: opcBackground ? "#3b82f6" : "#6b7280" }}
            />
          </span>
        </Tooltip>
      </div>
      {opcBackground && (
        <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row gap-5">
          {isLoadingBackgroundImage || !background ? (
            <Spinner className="pt-3 pb-3" />
          ) : (
            <section className="w-full flex justify-center md:px-4 lg:px-8">
              <article className="flex flex-col gap-1 lg:w-3/5">
                <p className="text-bold text-center text-tiny text-primary-400 whitespace-nowrap uppercase">
                  {backgroundImage?.description}
                </p>
                {/* Imagen de fondo */}
                {backgroundImage?.image ? (
                  <>
                    <img
                      className="object-contain rounded-sm shadow-md"
                      src={backgroundImage?.image}
                      alt={`Imagen de fondo de  ${backgroundImage?.description}`}
                    />
                    <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                      {backgroundImage?.publicId}
                    </span>
                  </>
                ) : (
                  <p className="">No se ha establecido la imagen de fondo</p>
                )}
              </article>
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default BackgroundCompanyBrands;
