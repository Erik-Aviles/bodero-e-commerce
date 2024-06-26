import { useContext } from "react";
import { FormContext } from "./FormContext";

export function TextArea({ label, name, placeholder }) {
  const { formValues, setFormValues } = useContext(FormContext);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-h-[60px] p-2.5 border border-gray-400 text-xs rounded-md transition duration-300 outline-none focus:outline focus:outline-2 focus:outline-black"
      />
    </div>
  );
}
