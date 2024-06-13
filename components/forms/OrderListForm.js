import NotificationContext from "@/context/NotificationContext";
import React, { useContext, useState } from "react";
import axios from "axios";
import ButtonClose from "../buttons/ButtonClose";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { justFirstWord } from "@/utils/justFirstWord";
import { capitalize } from "@/utils/utils";
import moment from "moment";
import ModalCustomers from "../modals/ModalCustomers";
import useCustomers from "@/hooks/useCustomers";

const OrderListForm = ({
  order,
  titulo,
  textSmall,
  toggleModal,
  fetchOrders,
}) => {
  const { newCustomers } = useCustomers();
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

  //crear pedido
  async function SaveOrder(e) {
    e.preventDefault();
    let data = {
      customer,
      articulo,
      date,
      orderEntryDate: !orderEntryDate
        ? ""
        : moment(orderEntryDate, moment.HTML5_FMT.DATE).locale("en").format(),
      orderDeliveryDate,
    };

    try {
      const res = await axios.post("/api/orderslist/full", data);
      showNotification({
        open: true,
        msj: res.data.message,
        status: "success",
      });
      fetchOrders();
      setCustomer("");
      setArticulo("");
      setDate("");
      setOrderEntryDate("");
      setOrderDeliveryDate("");
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //editar pedido
  async function EditCustomer(e) {
    e.preventDefault();
    let data = {
      customer,
      articulo,
      date,
      orderEntryDate: moment(orderEntryDate, moment.HTML5_FMT.DATE)
        .locale("en")
        .format(),
      orderDeliveryDate,
    };
    const _id = order._id;
    if (_id) {
      try {
        const res = await axios.put("/api/orderslist/full", { ...data, _id });
        showNotification({
          open: true,
          msj: res.data.message,
          status: "success",
        });
        fetchOrders();
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response.data.message,
          status: "error",
        });
      }
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
        onSubmit={!order ? SaveOrder : EditCustomer}
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
        <fieldset className="bg-grayLight flex flex-col border-container ">
          <legend className="text-center text-secondary">
            Seleccionar cliente
          </legend>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
              aria-label="Seleccion de clientes"
              className="max-w-xs"
              inputValue={customer}
              isRequired={true}
              onInputChange={(value) => setCustomer(value)}
            >
              {newCustomers.map((client) => (
                <AutocompleteItem
                  className="max-w-xs "
                  key={client._id}
                  value={client._id}
                >
                  {`${justFirstWord(capitalize(client.name))} ` +
                    ` ${justFirstWord(capitalize(client.lastname))} - CI:${
                      client?.identifications
                    }`}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </fieldset>
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
