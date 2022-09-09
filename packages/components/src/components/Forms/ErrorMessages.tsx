import React from "react";

export type ErrorMessagesProps = {
  type?: "pattern" | "required" | "maxLength" | string;
  message?: string;
};

export const Error = (props: React.ComponentProps<"div">) => (
  <div className="form-error" role="alert" {...props} />
);

const ErrorMessages = ({ type, message: messageProps }: ErrorMessagesProps) => {
  // get default error message if no message was passed
  let message = messageProps;
  if (!messageProps || messageProps === "") {
    message = getDefaultErrorMessage({ type });
  }

  return <Error>{message}</Error>;
};

export default ErrorMessages;

export function getDefaultErrorMessage({ type }) {
  switch (type) {
    case "pattern":
      return "Toto pole má nesprávny formát";
    case "required":
      return "Toto pole je povinný údaj";
    case "maxLength":
      return "Presiahli ste maxímálnu dĺžku poľa";
    default:
      return "V tomto poli nastala chyba";
  }
}
