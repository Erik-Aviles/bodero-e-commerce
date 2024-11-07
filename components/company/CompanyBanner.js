import React from "react";
import deleteImgCloudinary from "@/utils/deleteImgCloudinary";
import ModalBanners from "../modals/ModalBanners";
import TableBanner from "../tables/TableBanner";
import { useCompany } from "@/hooks/useCompany";
import { capitalize } from "@/utils/utils";
import { withSwal } from "react-sweetalert2";
import useActions from "@/hooks/useActions";
import { Tooltip } from "@nextui-org/react";
import Spinner from "../snnipers/Spinner";
import { fetcher } from "@/utils/fetcher";
import { UpArrowIcon } from "../Icons";
import axios from "axios";
import useSWR from "swr";

const CompanyBanner = withSwal(({ swal }) => {
  const { companyId } = useCompany();
  const { changeOpcBanner, opcBanner } = useActions();

  const apiUrlBanner = companyId
    ? `/api/companies/banners?companyId=${companyId}`
    : null;

  const {
    data,
    isLoading: isLoadingBanners,
    mutate: mutateBanner,
  } = useSWR(apiUrlBanner, fetcher);

  const dataBanners = data?.banners;

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

  return (
    <section
      className={`p-5 bg-white shadow-lg rounded-lg transition-all duration-500 ${
        opcBanner ? " bg-white/70 border-l-4 border-green-400" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-sm md:text-lg font-semibold text-primary m-0 border-b-1 border-gray-200">
            Banner de la tienda
          </h4>
          <ModalBanners mutateBanner={mutateBanner} companyId={companyId} />
        </div>
        <Tooltip color="warning" content={!opcBanner ? "Expandir" : "Contraer"}>
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
          {isLoadingBanners || !dataBanners ? (
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
  );
});

export default CompanyBanner;
