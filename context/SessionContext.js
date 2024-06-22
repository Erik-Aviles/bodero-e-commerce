import React, { createContext, useState, useEffect, useContext } from "react";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import axios from "axios";

const SessionContext = createContext();

const SessionProvider = withSwal(({ children, swal }) => {
  const { data: session, error, isLoading } = useSWR("/api/session", fetcher);

  return (
    <SessionContext.Provider value={{ session, error, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
});

export default SessionContext;
export { SessionProvider };
