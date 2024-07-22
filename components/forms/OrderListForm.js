import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import NotificationContext from "@/context/NotificationContext";
import ModalCustomers from "../modals/ModalCustomers";
import { justFirstWord } from "@/utils/justFirstWord";
import ButtonClose from "../buttons/ButtonClose";
import useCustomers from "@/hooks/useCustomers";
import { capitalize } from "@/utils/utils";
import moment from "moment";
import axios from "axios";
import useOrderList from "@/hooks/useOrderList";

const OrderListForm = ({ order, titulo, textSmall, toggleModal }) => {
  const { mutateOrderList } = useOrderList();
  const { customers } = useCustomers();
  const { showNotification } = useContext(NotificationContext);

  const [customer, setCustomer] = useState(order?.customer || "");
  const [articulo, setArticulo] = useState(order?.articulo || "");
  const [date, setDate] = useState(order?.date || "");
  const [orderEntryDate, setOrderEntryDate] = useState(
    (order?.orderEntryDate &&
      moment(order?.orderEntryDate)
        .locale("en")
        .format(moment.HTML5_FMT.DATE)) ||
      ""
  );
  const [orderDeliveryDate, setOrderDeliveryDate] = useState(
    order?.orderDeliveryDate || ""
  );

  //registrar pedido
  async function saveOrder(e) {
    e.preventDefault();
    let rest = {
      customer,
      articulo,
      date,
      orderEntryDate: !orderEntryDate
        ? ""
        : moment(orderEntryDate, moment.HTML5_FMT.DATE).locale("en").format(),
      orderDeliveryDate,
    };
    try {
      const { data } = await axios.post("/api/orderslist/full", rest);
      showNotification({
        open: true,
        msj: data.message,
        status: "success",
      });
      mutateOrderList();
      setCustomer("");
      setArticulo("");
      setDate("");
      setOrderEntryDate("");
      setOrderDeliveryDate("");
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //editar pedido
  async function editCustomer(e) {
    e.preventDefault();
    let rest = {
      customer,
      articulo,
      date,
      orderEntryDate: moment(orderEntryDate, moment.HTML5_FMT.DATE)
        .locale("en")
        .format(),
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
      mutateOrderList();
      setCustomer("");
      setArticulo("");
      setDate("");
      setOrderEntryDate("");
      setOrderDeliveryDate("");
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  const handleDateChange = (e) => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const segundos = ahora.getSeconds().toString().padStart(2, "0");
    const fechaHoraCompleta = `${e.target.value}T${horas}:${minutos}:${segundos}`;
    setDate(fechaHoraCompleta);
    setOrderEntryDate(e.target.value);
  };

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
        onSubmit={!order ? saveOrder : editCustomer}
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
              onChange={handleDateChange}
            />
            <input type="hidden" id="date" name="date" value={date} />
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
