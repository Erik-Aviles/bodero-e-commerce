export function Form({ title, description, onSubmit, children }) {
  return (
    <form
      className="p-5 rounded-lg min-w-[300px] my-5 shadow-lg"
      onSubmit={onSubmit}
    >
      <div className="text-left pb-2">
        <h2 className="m-0 font-bold text-lg">{title}</h2>
        {description && (
          <p className="mt-0 font-normal text-xs">{description}</p>
        )}
      </div>
      {children}
    </form>
  );
}
