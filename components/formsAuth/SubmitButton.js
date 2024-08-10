import { Loader } from "@/components/snnipers/Loader";

export function SubmitButton({ buttonText, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-4 w-full bg-primary2 text-white text-center rounded-md py-2 border border-transparent transition duration-300 flex items-center justify-center cursor-pointer hover:bg-white hover:text-primary2 hover:border-primary2"
    >
      {isLoading ? <Loader /> : buttonText}
    </button>
  );
}
