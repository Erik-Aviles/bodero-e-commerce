import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishtLoading = () => {
    setIsLoading(false);
  };
  return { isLoading, startLoading, finishtLoading };
}
