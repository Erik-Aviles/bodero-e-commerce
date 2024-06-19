import { ClipLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="w-full pt-64 pb-10 flex justify-center items-center">
      <ClipLoader color="#97a8bc" />
    </div>
  );
}
