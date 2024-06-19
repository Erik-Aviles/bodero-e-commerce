import { createContext, useState } from "react";
import { Input } from "./Input";
import { Footer } from "./Footer";
import { SubmitButton } from "./SubmitButton";
import { TextArea } from "./TextArea";
import Image from "next/image";
import logo from "../../../public/logo.jpg";

const formValues = {};

export const FormContext = createContext(formValues || undefined);

export function FormContextProvider({
  title,
  description,
  onSubmit,
  children,
}) {
  const [formValues, setFormValues] = useState({});

  const handleSutmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form
        className="p-5 rounded-lg min-w-[300px] my-5 shadow-lg"
        onSubmit={handleSutmit}
      >
        <figure className="w-full flex justify-center mb-5">
          <Image
            alt="Logo de la empresa con banderitas"
            src={logo}
            width={673 / 4}
            height={286 / 4}
          />
        </figure>
        <div className="text-left">
          <h2 className="m-0 font-bold text-lg">{title}</h2>
          {description && (
            <p className="mt-0 font-normal text-xs">{description}</p>
          )}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  );
}

FormContextProvider.Input = Input;
FormContextProvider.TextArea = TextArea;
FormContextProvider.Footer = Footer;
