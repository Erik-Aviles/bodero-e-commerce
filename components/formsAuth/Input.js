export function Input({ label, name, value, type, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <label htmlFor={value} className="text-sm font-semibold m-0">
        {label}
      </label>
      <input
        required={true}
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2.5 border border-gray-400 text-xs rounded-md transition duration-300 outline-0 focus:outline focus:outline-1 focus:outline-primary2"
      />
    </div>
  );
}
