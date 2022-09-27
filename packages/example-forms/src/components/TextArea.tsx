import React, { ComponentProps } from "react";
import { TextArea } from "components";
import { useFormContext } from "react-hook-form";

const ConnectedTextArea = React.forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextArea>
>(({ name, ...other }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return <TextArea ref={ref} name={name} error={error} {...other} />;
});

export default ConnectedTextArea;
