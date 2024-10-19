import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import axios from "axios";
import useDebts from "@/hooks/useDebts";
import ButtonClose from "../buttons/ButtonClose";
import { DeleteIcon, EdithIcon } from "../Icons";
import { Input } from "@nextui-org/react";
import { capitalize } from "@/utils/utils";

const DebtForm = ({ debt, titulo, textSmall, toggleModal }) => {
  const { mutateDebts } = useDebts();
  const { showNotification } = useContext(NotificationContext);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Mes de 0 a 11, por eso sumamos 1
  const day = String(today.getDate()).padStart(2, "0");

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");

  const localFormattedDate = `${year}-${month}-${day}`;

  const stringDate = `${localFormattedDate} ${hours}:${minutes}`;

  const [customer, setCustomer] = useState({
    fullname: debt?.customer?.fullname || "",
    phone: debt?.customer?.phone || "",
  }); //cliente
  const [vehicle, setVehicle] = useState(debt?.vehicle || ""); //vehiculo
  const [concept, setConcept] = useState(debt?.concept || ""); //motivo de la deuda
  const [document, setDocument] = useState(debt?.document || ""); //documento que lo evidencia
  const [amount, setAmount] = useState(debt?.amount || 0); //monto de la deuda
  const [debtBalance, setDebtBalance] = useState(amount); //saldo o pago pendiente
  const [fullPaymentDate, setFullPaymentDate] = useState(
    debt?.fullPaymentDate || ""
  ); //fecha de la terminacion de la deuda
  const [status, setStatus] = useState(debt?.status || ""); //estado de la deuda

  const [payments, setPayments] = useState(debt?.payments || []); //pagos realizados
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(localFormattedDate);
  const [pay, setPay] = useState("");
  const [editPaymentIndex, setEditPaymentIndex] = useState(null);

  //Actualizar el estado de la deuda
  const updateDebtStatus = (debtBalance, amount) => {
    const remainingPercentage = (debtBalance / amount) * 100;

    const debtStatus =
      amount === 0
        ? "Sin deuda"
        : remainingPercentage <= 0
        ? "pagado"
        : remainingPercentage <= 25
        ? "avanzado"
        : remainingPercentage <= 50
        ? "media"
        : remainingPercentage <= 75
        ? "bajo"
        : remainingPercentage < 100
        ? "critico"
        : "pendiente";

    setStatus(debtStatus);
  };

  //Ayudante para restar del saldo
  const subtractFromBalance = (paymentAmount) => {
    const parsedPaymentAmount = parseFloat(paymentAmount);
    if (!isNaN(parsedPaymentAmount)) {
      setDebtBalance((prevBalance) => {
        const newBalance = prevBalance - parsedPaymentAmount;
        updateDebtStatus(newBalance, amount);
        return newBalance;
      });
    }
  };

  const calculateDebtBalance = () => {
    const totalPaid = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    setPay(totalPaid);
    const newBalance = amount - totalPaid;
    setDebtBalance(newBalance);

    if (totalPaid === amount) {
      setFullPaymentDate(stringDate);
    } else {
      setFullPaymentDate("");
    }
    updateDebtStatus(newBalance, amount);
  };

  // useEffect para recalcular el saldo cada vez que cambia la deuda o los pagos
  useEffect(() => {
    calculateDebtBalance();
  }, [amount, payments]);

  // Registrar abono
  const handleAddPayments = () => {
    if (!amount) {
      return showNotification({
        open: true,
        msj: "Debe establecer el monto total de la deuda antes de agregar un abono.",
        status: "warning",
      });
    }

    if (!paymentAmount) {
      return showNotification({
        open: true,
        msj: "Por favor, ingrese el monto del abono.",
        status: "warning",
      });
    }

    const parsedPaymentAmount = parseFloat(paymentAmount);

    if (parsedPaymentAmount > amount) {
      return showNotification({
        open: true,
        msj: "El monto del abono no puede ser mayor al saldo pendiente.",
        status: "warning",
      });
    }

    const newPayment = { amount: parsedPaymentAmount, date: paymentDate };

    if (editPaymentIndex !== null) {
      const updatedPayments = payments.map((payment, index) =>
        index === editPaymentIndex ? newPayment : payment
      );
      setPayments(updatedPayments);
      setEditPaymentIndex(null);
    } else {
      setPayments([...payments, newPayment]);
    }
    subtractFromBalance(parsedPaymentAmount);

    setPaymentAmount("");
    setPaymentDate(localFormattedDate);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Función para registrar el monto total de la deuda
  const handleAmountChange = (event) => {
    const parsedAmount = parseFloat(event.target.value);
    if (!isNaN(parsedAmount)) {
      setAmount(parsedAmount);
      setDebtBalance(parsedAmount);
    }
  };

  /** Funciones de manejo de API */
  // Restablecer campos de formulario
  const resetDebtForm = () => {
    setCustomer({});
    setVehicle("");
    setConcept("");
    setDocument("");
    setAmount(0);
    setDebtBalance(0);
    setPay("");
    setFullPaymentDate("");
    setStatus("");
    setPayments([]);
  };

  // Registrar nueva deuda
  const handleSaveDebt = async (e) => {
    e.preventDefault();
    const rest = {
      concept,
      customer,
      vehicle,
      document,
      amount: parseFloat(amount),
      debtBalance,
      pay,
      fullPaymentDate,
      status,
      payments,
    };
    try {
      const { data } = await axios.post("/api/debts/full", rest);
      showNotification({ open: true, msj: data.message, status: "success" });
      mutateDebts();
      resetDebtForm();
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  };

  // Editar deuda
  async function handleEditDebt(e) {
    e.preventDefault();
    const updatedDebt = {
      customer,
      vehicle,
      amount,
      debtBalance,
      pay,
      payments,
      concept,
      document,
      fullPaymentDate,
      status,
    };
    try {
      const { data } = await axios.put("/api/debts/full", {
        ...updatedDebt,
        _id: debt._id,
      });
      showNotification({
        open: true,
        msj: `Deuda de: ${capitalize(updatedDebt?.customer?.fullname)}, ${
          data.message
        }`,
        status: "success",
      });
      resetDebtForm();
      mutateDebts();
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  const handleDeletePayment = (index) => {
    setPayments(payments.filter((_, paymentIndex) => paymentIndex !== index));
  };

  const handleEditPayment = (index) => {
    const paymentToEdit = payments[index];
    setPaymentAmount(paymentToEdit.amount);
    setPaymentDate(paymentToEdit.date);
    setEditPaymentIndex(index);
  };

  return (
    <div className="relative w-full flex flex-col justify-center ">
      <div className="flex justify-end items-center">
        <ButtonClose onClick={toggleModal} />
      </div>
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-col pb-2">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <div className="flex gap-1 flex-wrap text-primary text-xs">
            <p>{`Nota: ${textSmall}`}</p>
            <p>Usar la (,) para los decimales</p>
          </div>
        </div>
      </div>
      {/* Cuerpo de la informacion del pedido */}
      <form
        onSubmit={!debt ? handleSaveDebt : handleEditDebt}
        className="w-fit flex flex-col gap-5 sm:border-container lg:flex-row"
      >
        {/* Columna de la informacion del cliente*/}
        <div className="basis-1/2">
          <fieldset className="bg-grayLight border-container ">
            <legend className="text-center text-secondary">
              INFORMACIÓN DEL CLIENTE
            </legend>
            <div>
              <label className="my-1 block">Nombres (*)</label>
              <Input
                type="text"
                isRequired={true}
                name="fullname"
                value={customer.fullname}
                placeholder="Nombre y Apellido"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={handleCustomerChange}
              />
            </div>
            <div>
              <label className="my-1 block">Teléfono (*)</label>
              <Input
                type="text"
                isRequired={true}
                name="phone"
                value={customer.phone}
                placeholder="Número de contacto"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={handleCustomerChange}
              />
            </div>
          </fieldset>
          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary">
              DATOS GENERAL
            </legend>
            <div>
              <label className="my-1 block">Concepto (*)</label>
              <textarea
                isRequired={true}
                placeholder="Escribir la razón de la deuda"
                value={concept}
                required={true}
                className="min-h-[60px] "
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>
            <div>
              <label className="my-1 block">Vehículo</label>
              <Input
                type="text"
                value={vehicle}
                placeholder="Describir el vehículo por el cual adeuda (opcional)"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={(e) => setVehicle(e.target.value)}
              />
            </div>
            <div>
              <label className="my-1 block">Documento</label>
              <Input
                type="text"
                value={document}
                placeholder="Documento que evidencia la deuda (opcional)"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
          </fieldset>
        </div>

        {/* Columna de la informacion del cliente*/}
        <div className="basis-1/2 flex flex-col justify-between">
          <div className="gap-2 flex flex-col">
            {/* AREA DONDE SE MUESTRA el monto, el saldo y lo pagado */}
            <fieldset className="bg-grayLight flex flex-col gap-2 border-container ">
              <legend className="text-center text-secondary">
                INFORMACIÓN DE LA DEUDA
              </legend>
              <div className="flex gap-1">
                <div className="basis-2/6">
                  <label className="my-1 block">Monto (*)</label>
                  <Input
                    type="number"
                    labelPlacement="outside"
                    startContent={
                      <div className="flex items-center">
                        <span className="text-default-400 text-sm">$</span>
                      </div>
                    }
                    value={amount}
                    isRequired={true}
                    onChange={handleAmountChange}
                    placeholder="Monto de la deuda"
                  />
                </div>
                <div className="basis-2/6">
                  <label className="my-1 block">Saldo</label>
                  <Input
                    isReadOnly={true}
                    type="number"
                    labelPlacement="outside"
                    startContent={
                      <div className="flex items-center">
                        <span className="text-default-400 text-sm">$</span>
                      </div>
                    }
                    value={!amount ? 0 : debtBalance}
                    placeholder="Saldo de la deuda"
                    className="cursor-not-allowed"
                  />
                </div>
                <div className="basis-2/6">
                  <label className="my-1 block">Pagado</label>
                  <Input
                    isReadOnly={true}
                    type="number"
                    labelPlacement="outside"
                    startContent={
                      <div className="flex items-center">
                        <span className="text-default-400 text-sm">$</span>
                      </div>
                    }
                    value={pay}
                    placeholder="Sumatoria"
                    className="cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-1">
                  <label className="m-0 block">Estado: </label>
                  <span
                    className={`text-tiny font-bold capitalize ${
                      status === "pagado"
                        ? "text-success"
                        : status === "avanzado"
                        ? "text-sky-500"
                        : status === "bajo" || status === "media"
                        ? "text-warning"
                        : status === "critico" || status === "pendiente"
                        ? "text-error"
                        : "text-default-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                {(fullPaymentDate && payments.length > 0 ) && (
                  <div className="flex flex-col sm:flex-row sm:items-end sm:gap-1">
                    <label className="m-0 block">Fecha: </label>
                    <span className="text-default-500 text-tiny">
                      {fullPaymentDate}
                    </span>
                  </div>
                )}
              </div>
            </fieldset>
            {/* AREA DONDE SE MUESTRA LOS ABONO REALIZADOS */}
            {payments.length > 0 && (
              <fieldset className="bg-grayLight flex flex-col border-container ">
                <legend className="text-center text-secondary">
                  ABONOS REALIZADOS
                </legend>
                <ul className="flex w-full flex-col gap-1">
                  {payments.map((item, index) => (
                    <li key={index} className="flex gap-1 items-center">
                      <span className="text-default-500">{index + 1}.</span>
                      <Input
                        isReadOnly
                        type="number"
                        value={item.amount}
                        startContent={
                          <div className="flex items-center">
                            <span
                              className={`text-sm + ${
                                editPaymentIndex === index
                                  ? "text-success"
                                  : "text-default-400"
                              }`}
                            >
                              $
                            </span>
                          </div>
                        }
                        color={`${editPaymentIndex === index ? "success" : ""}`}
                      />
                      <Input
                        isReadOnly
                        type="date"
                        value={item.date}
                        color={`${editPaymentIndex === index ? "success" : ""}`}
                      />

                      <button
                        type="button"
                        className="text-white rounded-lg p-2 bg-primary cursor-pointer active:opacity-50"
                        onClick={() => handleEditPayment(index)}
                      >
                        <EdithIcon className="w-[15px] h-[15px]" />
                      </button>
                      <button
                        type="button"
                        className="text-white rounded-lg p-2 btn-delete"
                        onClick={() => handleDeletePayment(index)}
                      >
                        <DeleteIcon className="w-[15px] h-[15px]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
            <fieldset className="bg-grayLight flex flex-col border-container ">
              <legend className="text-center text-secondary uppercase">
                {editPaymentIndex !== null ? "Editar Abono" : "Registrar Abono"}
              </legend>
              <div className="flex gap-1 items-center">
                <Input
                  type="number"
                  value={paymentAmount}
                  startContent={
                    <div className="flex items-center">
                      <span className="text-default-400 text-sm">$</span>
                    </div>
                  }
                  placeholder="Monto del abono"
                  labelPlacement="outside"
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />

                <Input
                  type="date"
                  className="text-[9px]"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
                <button
                  type="button"
                  className="text-tiny bg-success whitespace-nowrap text-white rounded-lg p-2.5 basis-[5%]"
                  onClick={handleAddPayments}
                >
                  {editPaymentIndex !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </fieldset>
          </div>
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
        </div>
      </form>
    </div>
  );
};

export default DebtForm;
