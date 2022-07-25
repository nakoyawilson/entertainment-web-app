import { EntertainmentContext } from "../context/EntertainmentContext";
import { useContext } from "react";

export const useEntertainmentContext = () => {
  const context = useContext(EntertainmentContext);

  if (!context) {
    throw Error(
      "useEntertainmentContext must be used inside an EntertainmentContextProvider"
    );
  }
  return context;
};
