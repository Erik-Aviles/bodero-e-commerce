import { Loader } from "@/components/snnipers/Loader";

export function SubmitButton({ buttonText, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-4 w-full bg-black text-white text-center rounded-md py-2 border border-transparent transition duration-300 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black hover:border-black"
    >
      {isLoading ? <Loader /> : buttonText}
    </button>
  );
}
