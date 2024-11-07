import React from "react";
import deleteImgCloudinary from "@/utils/deleteImgCloudinary";
import useActions from "@/hooks/useActions";
import { withSwal } from "react-sweetalert2";
import { capitalize } from "@/utils/utils";
import { useCompany } from "@/hooks/useCompany";
import ModalBrands from "../modals/ModalBrands";
import { Tooltip } from "@nextui-org/react";
import { UpArrowIcon } from "../Icons";
import Spinner from "../snnipers/Spinner";
import TableBrand from "../tables/TableBrand";
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import useSWR from "swr";

const CompanyBrand = withSwal(({ swal}) => {
    const {companyId} = useCompany();

  const { changeOpcBrand, opcBrand } = useActions();

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
    <section
      className={`p-5 bg-white shadow-lg rounded-lg transition-all duration-500 ${
        opcBrand ? " bg-white/70 border-l-4 border-yellow" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
            Marcas de la tienda
          </h4>
          <ModalBrands mutateBrand={mutateBrand} companyId={companyId} />
        </div>
        <Tooltip color="warning" content={!opcBrand ? "Expandir" : "Contraer"}>
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
          {isLoadingBrands || !dataBrands ? (
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
  );
});

export default CompanyBrand;
