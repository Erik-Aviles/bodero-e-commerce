import NotificationContext from "@/context/NotificationContext";
import { Input } from "@nextui-org/react";
import ButtonClose from "../buttons/ButtonClose";
import { useContext, useState } from "react";
import useCustomers from "@/hooks/useCustomers";
import { justFirstWord } from "@/utils/justFirstWord";
import { capitalize } from "@/utils/utils";
import axios from "axios";

const CustomerForm = ({ customer, titulo, textSmall, toggleModal }) => {
  const { getCustomers } = useCustomers();
  const { showNotification } = useContext(NotificationContext);

  const [name, setName] = useState(customer?.name || "");
  const [lastname, setLastname] = useState(customer?.lastname || "");
  const [identifications, setIdentifications] = useState(
    customer?.identifications || ""
  );
  const [address, setAddress] = useState(customer?.address || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [observations, setObservations] = useState(
    customer?.observations || ""
  );

  //registrar cliente
  async function saveCustomer(e) {
    e.preventDefault();
    let rest = {
      name: name.toLowerCase(),
      lastname: lastname.toLowerCase(),
      identifications,
      address,
      phone,
      email,
      observations,
    };
    try {
      const { data } = await axios.post("/api/customers/full", rest);
      showNotification({
        open: true,
        msj: data?.message,
        status: "success",
      });
      getCustomers();
      setName("");
      setLastname("");
      setIdentifications("");
      setAddress("");
      setPhone("");
      setEmail("");
      setObservations("");
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //editar cliente
  async function editCustomer(e) {
    e.preventDefault();
    let rest = {
      name: name.toLowerCase(),
      lastname: lastname.toLowerCase(),
      identifications,
      address,
      phone,
      email,
      observations,
    };
    try {
      const _id = customer._id;
      const { data } = await axios.put("/api/customers/full", {
        ...rest,
        _id,
      });
      showNotification({
        open: true,
        msj: `Cliente: ${justFirstWord(capitalize(rest.name))}, ${
          data.message
        }`,
        status: "success",
      });
      toggleModal();
      getCustomers();
      setName("");
      setLastname("");
      setIdentifications("");
      setAddress("");
      setPhone("");
      setEmail("");
      setObservations("");
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  return (
    <div className="relative w-full flex flex-col justify-center ">
      <header className=" flex flex-row justify-between">
        <h3 className="text-lg font-semibold">{titulo}</h3>
        <ButtonClose onClick={toggleModal} />
      </header>
      <p className="text-primary text-xs pb-3">{textSmall}</p>
      <form
        className="flex flex-col gap-2 "
        onSubmit={!customer ? saveCustomer : editCustomer}
      >
        <div className="flex flex-col gap-2 w-full overflow-auto ">
          <div className="flex flex-col md:flex-row gap-2">
            <fieldset className="bg-grayLight flex flex-col border-container">
              <legend className="text-center text-secondary">
                DATOS PERSONALES
              </legend>
              <div className="xs:flex xs:gap-2">
                <div className="">
                  <label className="block my-1">Nombres (*)</label>
                  <Input
                    type="text"
                    value={name}
                    isRequired={true}
                    placeholder="Escribir Nombres"
                    labelPlacement="outside"
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </div>
                <div>
                  <label className="block my-1">Apellidos (*)</label>
                  <Input
                    type="text"
                    value={lastname}
                    isRequired={true}
                    placeholder="Escribir Apellidos"
                    labelPlacement="outside"
                    onChange={(e) => setLastname(e.target.value.toLowerCase())}
                  />
                </div>
              </div>
              <div className="xs:flex xs:gap-2">
                <div className="">
                  <label className="my-1 block">Teléfono (*)</label>
                  <Input
                    type="text"
                    value={phone}
                    isRequired={true}
                    placeholder="Escribir teléfono"
                    labelPlacement="outside"
                    onChange={(e) => setPhone(e.target.value.toLowerCase())}
                  />
                </div>
                <div className="">
                  <label className="my-1 block">Cédula</label>
                  <Input
                    type="text"
                    value={identifications}
                    placeholder="Escribir Cédula"
                    labelPlacement="outside"
                    onChange={(e) =>
                      setIdentifications(e.target.value.toLowerCase())
                    }
                  />
                </div>
              </div>
              <div className="xs:flex xs:gap-2">
                <div className="">
                  <label className="my-1 block">Dirección </label>
                  <Input
                    type="text"
                    value={address}
                    placeholder="Escribir dirección"
                    labelPlacement="outside"
                    onChange={(e) => setAddress(e.target.value.toLowerCase())}
                  />
                </div>

                <div className="">
                  <label className="my-1 block">Correo</label>
                  <Input
                    type="text"
                    value={email}
                    placeholder="Escribir correo"
                    labelPlacement="outside"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </div>
              </div>
              <div className="">
                <label className="my-1 block">Observaciones </label>
                <div className="">
                  <textarea
                    rows={3}
                    maxLength={50}
                    placeholder="Escribir observaciones"
                    value={observations}
                    className="min-h-[55px]"
                    onChange={(e) => setObservations(e.target.value)}
                  />
                  {observations.length === 50 ? (
                    <span className="pt-1 text-success text-[10px] ">
                      A llegado al limite de caracteres.
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
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
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
