import React, { useContext, useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import NotificationContext from "@/context/NotificationContext";
import ModalCustomers from "../modals/ModalCustomers";
import { justFirstWord } from "@/utils/justFirstWord";
import ButtonClose from "../buttons/ButtonClose";
import useCustomers from "@/hooks/useCustomers";
import { capitalize } from "@/utils/utils";
import axios from "axios";
import useOrderList from "@/hooks/useOrderList";

const OrderListForm = ({ order, titulo, textSmall, toggleModal }) => {
  const { mutateOrderList } = useOrderList();
  const { customers } = useCustomers();
  const { showNotification } = useContext(NotificationContext);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [customer, setCustomer] = useState(order?.customer || "");
  const [articulo, setArticulo] = useState(order?.articulo || "");
  const [orderEntryDate, setOrderEntryDate] = useState(
    order?.orderEntryDate
      .split("T")[0]
      .split("-")
      .map((parte, i) => (i === 2 ? parte.replace(/^0+/, "") : parte))
      .join("-") || formattedDate
  );
  const [orderDeliveryDate, setOrderDeliveryDate] = useState(
    order?.orderDeliveryDate || ""
  );

  const dateTimeFull = `${orderEntryDate}T${hours}:${minutes}:${seconds}`;

  // Restablecer campos de formulario
  const resetOrderListForm = () => {
    setCustomer("");
    setArticulo("");
    setOrderEntryDate("");
    setOrderDeliveryDate("");
  };

  //Registrar pedido
  async function handleSaveCustomer(e) {
    e.preventDefault();
    let rest = {
      customer,
      articulo,
      orderEntryDate: dateTimeFull,
      orderDeliveryDate,
    };
    try {
      const { data } = await axios.post("/api/orderslist/full", rest);
      showNotification({
        open: true,
        msj: data.message,
        status: "success",
      });
      resetOrderListForm();
      mutateOrderList();
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //Editar pedido
  async function handleEditCustomer(e) {
    e.preventDefault();
    let rest = {
      customer,
      articulo,
      orderEntryDate: dateTimeFull,
      orderDeliveryDate,
    };
    const _id = order._id;
    try {
      const { data } = await axios.put("/api/orderslist/full", {
        ...rest,
        _id,
      });
      showNotification({
        open: true,
        msj: `Pedido: ${capitalize(rest.articulo)}, ${data.message}`,
        status: "success",
      });
      resetOrderListForm();
      mutateOrderList();
      toggleModal();
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
      <div className="flex justify-end items-center">
        <ButtonClose onClick={toggleModal} />
      </div>
      <header className=" sm:pb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-col pb-2">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <p className="text-primary text-xs">{textSmall}</p>
        </div>
        <ModalCustomers />
      </header>
      {/* Cuerpo de la informacion del pedido */}
      <form
        onSubmit={!order ? handleSaveCustomer : handleEditCustomer}
        className="flex flex-col gap-2"
      >
        <fieldset className="bg-grayLight flex flex-col border-container ">
          <legend className="text-center text-secondary">
            Escribir producto
          </legend>
          <div className="flex gap-1 pb-2">
            <textarea
              placeholder="Escribir breve detalle del producto"
              value={articulo}
              required={true}
              className="min-h-[60px] "
              onChange={(e) => setArticulo(e.target.value)}
            />
          </div>
        </fieldset>
        {customers && (
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary">
              Seleccionar cliente
            </legend>
            <div className="flex w-full flex-col">
              <Autocomplete
                isRequired={true}
                aria-label="Seleccion de clientes"
                label="Clientes"
                defaultItems={customers?.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
                selectedKey={customer}
                onSelectionChange={setCustomer}
              >
                {(item) => (
                  <AutocompleteItem key={item._id}>
                    {`${justFirstWord(capitalize(item.name))} ` +
                      ` ${justFirstWord(capitalize(item.lastname))} ` +
                      (item?.identifications
                        ? `- ${item?.identifications}`
                        : "- Sin cedula")}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </fieldset>
        )}
        <fieldset className="bg-grayLight flex flex-col border-container ">
          <legend className="text-center text-secondary">
            Seleccionar fecha de registro
          </legend>
          <div className="flex gap-1 pb-2">
            <Input
              type="date"
              value={orderEntryDate}
              labelPlacement="outside"
              isRequired={true}
              onChange={(e) => setOrderEntryDate(e.target.value)}
            />
          </div>
        </fieldset>
        <div className="flex gap-1 my-1">
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
      </form>
    </div>
  );
};

export default OrderListForm;
