import { ClipLoader } from "react-spinners";

export default function Spinner({className="pt-64 pb-10"}) {
  return (
    <div className={`flex justify-center items-center w-full  ${className}`}>
      <ClipLoader color="#97a8bc" />
    </div>
  );
}
