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
  const { name } = React.useContext(FieldContext);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors?.[name]?.type === "pattern" && <Error>{pattern}</Error>}
      {errors?.[name]?.type === "required" && <Error>{required}</Error>}
      {errors?.[name]?.type === "maxLength" && <Error>{maxLength}</Error>}
      {types[errors?.[name]?.type] ? (
        <Error>{types[errors?.[name]?.type]}</Error>
      ) : (
        <Error>{errors?.[name]?.message}</Error>
      )}
    </>
  );
};
export default ErrorMessages;
