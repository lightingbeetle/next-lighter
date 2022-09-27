import React, { ComponentProps } from "react";
import { Input } from "components";
import { useFormContext } from "react-hook-form";

const ConnectedInput = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>(({ name, ...other }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return <Input ref={ref} name={name} error={error} {...other} />;
});

export default ConnectedInput;
