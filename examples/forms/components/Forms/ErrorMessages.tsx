import React from "react";
import { useFormContext } from "react-hook-form";
import FieldContext from "./FieldContext";

export type ErrorMessagesProps = {
  pattern?: string;
  required?: string;
  maxLength?: string;
  [type: string]: string;
};

export const Error = (props: React.ComponentProps<"div">) => (
  <div className="form-error" role="alert" {...props} />
);

const ErrorMessages = ({
  pattern = "Toto pole má nesprávny formát",
  required = "Toto pole je povinný údaj",
  maxLength = "Presiahli ste maxímálnu dĺžku poľa",
  ...types
}: ErrorMessagesProps) => {
  const { id } = React.useContext(FieldContext);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors?.[id]?.type === "pattern" && <Error>{pattern}</Error>}
      {errors?.[id]?.type === "required" && <Error>{required}</Error>}
      {errors?.[id]?.type === "maxLength" && <Error>{maxLength}</Error>}
      {types[errors?.[id]?.type] ? (
        <Error>{types[errors?.[id]?.type]}</Error>
      ) : (
        <Error>{errors?.[id]?.message}</Error>
      )}
    </>
  );
};
export default ErrorMessages;
