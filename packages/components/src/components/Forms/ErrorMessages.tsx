import React from "react";
import { useFormContext } from "react-hook-form";
import { useField } from "./useField";

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
  const { name } = useField();
  const {
    formState: { errors },
  } = useFormContext();

  // TODO: not sure about this pattern (TS dont' work here well) - seems hard to read and understand the code and it's werbose with magic strings like "pattern" or "required"
  return (
    <>
      {/* @ts-ignore */}
      {errors?.[name]?.type === "pattern" && <Error>{pattern}</Error>}
      {/* @ts-ignore */}
      {errors?.[name]?.type === "required" && <Error>{required}</Error>}
      {/* @ts-ignore */}
      {errors?.[name]?.type === "maxLength" && <Error>{maxLength}</Error>}
      {/* @ts-ignore */}
      {types[errors?.[name]?.type] ? (
        /* @ts-ignore */
        <Error>{types[errors?.[name]?.type]}</Error>
      ) : (
        <Error>{errors?.[name]?.message}</Error>
      )}
    </>
  );
};
export default ErrorMessages;
