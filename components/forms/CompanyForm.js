import { Input } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, EdithIcon } from "../Icons";
import ButtonClose from "../buttons/ButtonClose";
import useLoading from "@/hooks/useLoading";
import { capitalize } from "@/utils/utils";
import axios from "axios";

const CompanyForm = ({ company, titulo, toggleModal, mutateGeneral }) => {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const { showNotification } = useContext(NotificationContext);

  const [name, setName] = useState(company?.name || "");
  const [subtitle, setSubtitle] = useState(company?.subtitle || "");
  const [motto, setMotto] = useState(company?.motto || "");
  const [address, setAddress] = useState(company?.address || "");
  const [mainPhone, setMainPhone] = useState(company?.mainPhone || "");
  const [secondaryPhone, setSecondaryPhone] = useState(
    company?.secondaryPhone || ""
  );
  const [mainEmail, setMainEmail] = useState(company?.mainEmail || "");
  const [secondaryEmail, setSecondaryEmail] = useState(
    company?.secondaryEmail || ""
  );

  const [mainlogo, setMainlogo] = useState(company?.mainlogo || "");
  const [secondarylogo, setSecondarylogo] = useState(
    company?.secondarylogo || ""
  );
  const [website, setWebsite] = useState(company?.website || "");

  const [socialMedia, setSocialMedia] = useState(company?.socialMedia || []);
  const [socialMediaTitle, setSocialMediaTitle] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [editSocialMediaIndex, setEditSocialMediaIndex] = useState(null);

  // Restablecer campos de formulario
  const resetCompanyForm = () => {
    setName("");
    setSubtitle("");
    setMotto("");
    setAddress("");
    setMainPhone("");
    setSecondaryPhone("");
    setMainEmail("");
    setSecondaryEmail("");
    setMainlogo("");
    setSecondarylogo("");
    setWebsite("");
    setSocialMedia([]);
  };

  //registrar company
  async function handleSaveCompany(e) {
    e.preventDefault();
    let rest = {
      name,
      subtitle,
      motto,
      address,
      mainPhone,
      secondaryPhone,
      mainEmail,
      secondaryEmail,
      mainlogo,
      secondarylogo,
      website,
      socialMedia,
    };
    try {
      const { data } = await axios.post(`/api/companies/general`, rest);
      showNotification({
        open: true,
        msj: data?.message,
        status: "success",
      });
      mutateGeneral();
      resetCompanyForm();
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //editar producto
  async function handleEdithCompany(e) {
    e.preventDefault();
    let updateCompany = {
      name,
      subtitle,
      motto,
      address,
      mainPhone,
      secondaryPhone,
      mainEmail,
      secondaryEmail,
      mainlogo,
      secondarylogo,
      website,
      socialMedia,
    };
    const _id = company?._id;
    if (_id) {
      try {
        const { data } = await axios.put("/api/companies/general", {
          ...updateCompany,
          _id,
        });
        showNotification({
          open: true,
          msj: `${capitalize(updateCompany.name)}, ${data?.message}`,
          status: "success",
        });
        mutateGeneral();
        resetCompanyForm();
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response?.data?.message,
          status: "error",
        });
      }
    }
  }

  const handleAddSocialMedia = () => {
    const newSocialMedia = { title: socialMediaTitle, link: socialMediaLink };

    if (editSocialMediaIndex !== null) {
      const updatedSocialMedia = socialMedia.map((item, index) =>
        index === editPaymentIndex ? newSocialMedia : item
      );
      setSocialMedia(updatedSocialMedia);
      setEditPaymentIndex(null);
    } else {
      setSocialMedia([...socialMedia, newSocialMedia]);
    }

    setSocialMediaTitle("");
    setSocialMediaLink("");
  };

  const handleDeleteSocialMedia = (index) => {
    setSocialMedia(
      socialMedia.filter((_, paymentIndex) => paymentIndex !== index)
    );
  };

  const handleEditSocialMedia = (index) => {
    const itemToEdit = socialMedia[index];
    setSocialMediaTitle(itemToEdit.title);
    setSocialMediaLink(itemToEdit.link);
    setEditSocialMediaIndex(index);
  };

  return (
    <div className="relative w-full flex flex-col justify-center ">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h3 className="text-sm sm:text-lg font-semibold">
          Editar información de la empresa
        </h3>
        <div className="flex justify-end items-center">
          <ButtonClose onClick={toggleModal} />
        </div>
      </div>
      <form
        onSubmit={!company ? handleSaveCompany : handleEdithCompany}
        className="w-fit flex flex-col gap-2 lg:grid lg:grid-cols-3 sm:border-container "
      >
        {/* Columna de logos*/}
        <div className="gap-2 flex flex-col">
          {/* Información general */}
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary uppercase">
              Información general
            </legend>
            <div>
              <label className="block my-1">Empresa</label>
              <Input
                type="text"
                labelPlacement="outside"
                value={name}
                placeholder="Name principal"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Sub titulo</label>
              <Input
                type="text"
                value={subtitle}
                placeholder="Nombre secundario"
                labelPlacement="outside"
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Lema</label>
              <Input
                type="text"
                value={motto}
                placeholder="Lema"
                labelPlacement="outside"
                onChange={(e) => setMotto(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Dirección</label>
              <Input
                type="text"
                value={address}
                placeholder="Dirección"
                labelPlacement="outside"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Página web</label>
              <Input
                type="text"
                value={website}
                placeholder="Web de la empresa"
                labelPlacement="outside"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </fieldset>

          {/* Logos */}
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary uppercase">
              Logos
            </legend>
            <div>
              <label className="block my-1">Primario</label>
              <Input
                type="text"
                labelPlacement="outside"
                value={mainlogo}
                placeholder="Logo principal"
                onChange={(e) => setMainlogo(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Secundario</label>
              <Input
                type="text"
                value={secondarylogo}
                placeholder="Logo secundario"
                labelPlacement="outside"
                onChange={(e) => setSecondarylogo(e.target.value)}
              />
            </div>
          </fieldset>
        </div>
        <div className="gap-2 flex flex-col">
          {/* Correos */}
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary uppercase">
              Correos
            </legend>
            <div>
              <label className="block my-1">Primario</label>
              <Input
                type="text"
                labelPlacement="outside"
                value={mainEmail}
                placeholder="Logo principal"
                onChange={(e) => setMainEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Secundario</label>
              <Input
                type="text"
                value={secondaryEmail}
                placeholder="Logo secundario"
                labelPlacement="outside"
                onChange={(e) => setSecondaryEmail(e.target.value)}
              />
            </div>
          </fieldset>
          {/* Teléfonos */}
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary uppercase">
              Teléfonos
            </legend>
            <div>
              <label className="block my-1">Primario</label>
              <Input
                type="text"
                labelPlacement="outside"
                value={mainPhone}
                placeholder="Logo principal"
                onChange={(e) => setMainPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block my-1">Secundario</label>
              <Input
                type="text"
                value={secondaryPhone}
                placeholder="Logo secundario"
                labelPlacement="outside"
                onChange={(e) => setSecondaryPhone(e.target.value)}
              />
            </div>
          </fieldset>
        </div>
        <div className="gap-2 flex flex-col">
          {/* AREA DONDE SE MUESTRA LAS REDES SOCIALES REGISTRADAS */}
          {socialMedia.length > 0 && (
            <fieldset className="bg-grayLight flex flex-col border-container ">
              <legend className="text-center text-secondary">
                REDES SOCIALES REGISTRADAS
              </legend>
              <ul className="flex w-full flex-col gap-1">
                {socialMedia.map((item, index) => (
                  <li key={index} className="flex gap-1 items-center">
                    <span className="text-default-500">{index + 1}.</span>
                    <Input
                      isReadOnly
                      type="text"
                      value={item.title}
                      color={`${
                        editSocialMediaIndex === index ? "success" : ""
                      }`}
                    />
                    <Input
                      isReadOnly
                      type="text"
                      value={item.link}
                      color={`${
                        editSocialMediaIndex === index ? "success" : ""
                      }`}
                    />

                    <button
                      type="button"
                      className="text-white rounded-lg p-2 bg-primary cursor-pointer active:opacity-50"
                      onClick={() => handleEditSocialMedia(index)}
                    >
                      <EdithIcon className="w-[15px] h-[15px]" />
                    </button>
                    <button
                      type="button"
                      className="text-white rounded-lg p-2 btn-delete"
                      onClick={() => handleDeleteSocialMedia(index)}
                    >
                      <DeleteIcon className="w-[15px] h-[15px]" />
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>
          )}

          {/* Redes Sociales*/}
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary uppercase">
              {editSocialMediaIndex !== null
                ? "Editar red social"
                : "Registrar red soacial"}
            </legend>
            <div className="flex gap-1 items-center">
              <Input
                type="text"
                value={socialMediaTitle}
                placeholder="Nombre"
                labelPlacement="outside"
                onChange={(e) => setSocialMediaTitle(e.target.value)}
              />

              <Input
                type="text"
                value={socialMediaLink}
                placeholder="Link"
                labelPlacement="outside"
                onChange={(e) => setSocialMediaLink(e.target.value)}
              />
              <button
                type="button"
                className="text-tiny bg-success whitespace-nowrap text-white rounded-lg p-2.5 basis-[5%]"
                onClick={handleAddSocialMedia}
              >
                {editSocialMediaIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </fieldset>

          {/*Botones */}
          <div className="flex gap-1 mb-1">
            <button
              onClick={toggleModal}
              className="bg-secundary basis-1/2 hover:bg-secundary/60 text-white font-bold py-2 px-4"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="btn-primary hover:bg-primary/60 py-1 xs:w-40 basis-1/2"
              disabled={isLoading}
            >
              {isLoading ? "Esperar..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
