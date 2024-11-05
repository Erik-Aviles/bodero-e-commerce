import React from "react";
import ModalCompany from "./modals/ModalCompany";
import TableBanner from "./tables/TableBanner";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import ModalBanners from "./modals/ModalBanners";
import { withSwal } from "react-sweetalert2";
import Spinner from "./snnipers/Spinner";
import { capitalize } from "@/utils/utils";
import axios from "axios";
import ModalBrands from "./modals/ModalBrands";
import TableBrand from "./tables/TableBrand";
import deleteImgCloudinary from "@/utils/deleteImgCloudinary";
import ModalBackgroundImage from "./modals/ModalBackgroundImage";
import { UpArrowIcon } from "./Icons";
import useActions from "@/hooks/useActions";
import { Tooltip } from "@nextui-org/react";

const SystemAppearance = withSwal(({ swal }) => {
  const {
    changeOpcCompany,
    changeOpcBanner,
    changeOpcBrand,
    changeOpcBackground,
    opcCompany,
    opcBanner,
    opcBrand,
    opcBackground,
  } = useActions();

  //Informacion de la empresa
  const apiUrl = "/api/companies/general";
  const {
    data: general,
    error,
    isLoading: isLoadingGeneral,
    mutate: mutateGeneral,
  } = useSWR(apiUrl, fetcher);

  const company = general?.at(0);
  const companyId = company?._id;

  //Informacion de los banners
  const apiUrlBanner = companyId
    ? `/api/companies/banners?companyId=${companyId}`
    : null;

  const {
    data,
    isLoading: isLoadingBanners,
    mutate: mutateBanner,
  } = useSWR(apiUrlBanner, fetcher);

  const dataBanners = data?.banners;

  //Informacion de las marcas
  const apiUrlBrand = companyId
    ? `/api/companies/brands?companyId=${companyId}`
    : null;

  const {
    data: allBrands,
    isLoading: isLoadingBrands,
    mutate: mutateBrand,
  } = useSWR(apiUrlBrand, fetcher);

  const dataBrands = allBrands?.brands;

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

  // Eliminar Banner
  async function handleDeleteBanner(banner) {
    const bannerId = banner?.bannerId;
    const public_id = banner?.public_id;
    try {
      const result = await swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la imagen de forma permanente.",
        text: `¿Realmente desea eliminar la imagen: "${
          banner?.description > 30
            ? capitalize(banner?.description).substring(0, 30) + "..."
            : capitalize(banner?.description)
        }" de la base de datos? Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete("/api/companies/banners", {
          data: { bannerId, companyId },
        });

        await deleteImgCloudinary(public_id);

        swal.fire({
          title: "Eliminado!",
          text: data.message,
          icon: "success",
        });
        mutateBanner();
      }
    } catch (error) {
      console.error(
        `Error eliminando el Banner: ${banner?.description}. `,
        error
      );
      swal.fire({
        title: "Error",
        text: `No se pudo eliminar el Banner: ${
          banner?.description > 30
            ? capitalize(banner?.description).substring(0, 30) + "..."
            : capitalize(banner?.description)
        }.`,
        icon: "error",
      });
    }
  }

  // Eliminar Marca
  async function handleDeleteBrand(brand) {
    const brandId = brand?.brandId;
    const public_id = brand?.public_id;

    try {
      const result = await swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la imagen de forma permanente.",
        text: `¿Realmente desea eliminar la imagen: "${
          brand?.name > 30
            ? capitalize(brand?.name).substring(0, 30) + "..."
            : capitalize(brand?.name)
        }" de la base de datos? Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete("/api/companies/brands", {
          data: { brandId, companyId },
        });

        await deleteImgCloudinary(public_id);

        swal.fire({
          title: "Eliminado!",
          text: data.message,
          icon: "success",
        });
        mutateBrand();
      }
    } catch (error) {
      console.error(
        `Error eliminando la marca: ${capitalize(brand?.name)}. `,
        error
      );
      swal.fire({
        title: "Error",
        text: `No se pudo eliminar la Marca: ${
          brand?.name > 30
            ? capitalize(brand?.name).substring(0, 30) + "..."
            : capitalize(brand?.name)
        }.`,
        icon: "error",
      });
    }
  }

  return (
    <section className="flex flex-col gap-2">
      {/* INFORMACION DE LA EMPRESA */}
      <section className="p-5 bg-white shadow-md rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
              Información de la empresa
            </h4>
            <ModalCompany company={company} mutateGeneral={mutateGeneral} />
          </div>

          <Tooltip
            color="warning"
            content={!opcCompany ? "Expandir" : "Extraer"}
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
          <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row gap-5 transition-transform duration-700">
            {isLoadingGeneral || !general ? (
              <Spinner className="pt-3 pb-3" />
            ) : (
              <>
                <div className="flex items-center lg:justify-between basis-[33%] ">
                  {/* Logo de la empresa */}
                  <div className="w-full justify-center gap-4 flex items-center md:justify-between mb-6">
                    <img
                      className="h-16 w-16 object-contain rounded-full shadow-md"
                      src={company?.mainlogo}
                      alt={`Logo de ${company?.name}`}
                    />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 uppercase">
                        {company?.name}
                      </h2>
                      <p className="text-sm text-gray-500">{company?.motto}</p>
                    </div>
                  </div>
                </div>
                {/* Información General */}
                <div className="space-y-2 basis-[45%]">
                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Dirección:
                    </span>
                    <span className="text-gray-800">{company?.address}</span>
                  </div>

                  <div className="">
                    <span className="text-primary font-semibold pr-2">
                      Teléfono:
                    </span>
                    <span className="text-gray-800">{company?.mainPhone}</span>
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
                {/* Redes Sociales */}
                <div className="flex md:flex-col md:gap-3 justify-evenly basis-[20%]">
                  {company?.socialMedia.length > 0 &&
                    company?.socialMedia.map((item, index) => (
                      <a
                        key={index}
                        href={item?.link}
                        className="text-gray-500 hover:text-primary transition duration-300 capitalize"
                      >
                        <i>{item?.title}</i>
                      </a>
                    ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* BANNER DE LA TIENDA */}
      <section className="p-5 bg-white shadow-lg rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
              Banner de la tienda
            </h4>
            <ModalBanners mutateBanner={mutateBanner} companyId={companyId} />
          </div>
          <Tooltip
            color="warning"
            content={!opcBanner ? "Expandir" : "Extraer"}
          >
            <span
              className="border-1 border-warning p-2 text-lg cursor-pointer active:opacity-50"
              onClick={changeOpcBanner}
            >
              <UpArrowIcon
                className={`w-3 h-3 fill-[#ff6e01] stroke-[#ff6e01]  transition-transform duration-700 ${
                  opcBanner ? "rotate-180" : ""
                }`}
                style={{ color: opcBanner ? "#3b82f6" : "#6b7280" }}
              />
            </span>
          </Tooltip>
        </div>
        {opcBanner && (
          <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row gap-5">
            {isLoadingBanners || !data ? (
              <Spinner className="pt-3 pb-3" />
            ) : (
              <section className="w-full md:px-4 lg:px-8">
                <TableBanner
                  banners={dataBanners}
                  handleDeleteBanner={handleDeleteBanner}
                  companyId={companyId}
                  mutateBanner={mutateBanner}
                />
              </section>
            )}
          </div>
        )}
      </section>

      {/* MARCAS DE LA TIENDA */}
      <section className="p-5 bg-white shadow-lg rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
              Marcas de la tienda
            </h4>
            <ModalBrands mutateBrand={mutateBrand} companyId={companyId} />
          </div>
          <Tooltip
            color="warning"
            content={!opcBrand ? "Expandir" : "Extraer"}
          >
            <span
              className="border-1 border-warning p-2 text-lg cursor-pointer active:opacity-50"
              onClick={changeOpcBrand}
            >
              <UpArrowIcon
                className={`w-3 h-3 fill-[#ff6e01] stroke-[#ff6e01]  transition-transform duration-700 ${
                  opcBrand ? "rotate-180" : ""
                }`}
                style={{ color: opcBrand ? "#3b82f6" : "#6b7280" }}
              />
            </span>
          </Tooltip>
        </div>
        {opcBrand && (
          <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row gap-5">
            {isLoadingBrands || !allBrands ? (
              <Spinner className="pt-3 pb-3" />
            ) : (
              <section className="w-full md:px-4 lg:px-8">
                <TableBrand
                  brands={dataBrands}
                  handleDeleteBrand={handleDeleteBrand}
                  companyId={companyId}
                  mutateBrand={mutateBrand}
                />
              </section>
            )}
          </div>
        )}
      </section>

      {/* FONDO EN LAS MARCAS DE LA TIENDA */}
      <section className="p-5 bg-white shadow-lg rounded-lg ">
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
            content={!opcBackground ? "Expandir" : "Extraer"}
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
    </section>
  );
});

export default SystemAppearance;
