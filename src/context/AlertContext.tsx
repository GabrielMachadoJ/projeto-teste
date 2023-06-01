import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface AlertContextProviderProps {
  children: ReactNode;
}

type AlertContextContextData = {
  message: String;
  setMessage: (value: React.SetStateAction<any>) => void;
};

export const AlertContextContext = createContext({} as AlertContextContextData);

export function AlertContextProvider({ children }: AlertContextProviderProps) {
  const [message, setMessage] = useState("");

  return (
    <AlertContextContext.Provider value={{ message, setMessage }}>
      {children}
    </AlertContextContext.Provider>
  );
}

export const useAlertContext = () => useContext(AlertContextContext);
