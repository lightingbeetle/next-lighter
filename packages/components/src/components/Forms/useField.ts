import { useContext } from "react";
import FieldContext from "./FieldContext";

export const useField = () => {
  return useContext(FieldContext);
};
