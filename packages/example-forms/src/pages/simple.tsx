import React from "react";
// prettier-disable-next-line
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "components";

function SimpleForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    alert(`submitted ${JSON.stringify(data)}`);
  };

  return (
    <>
      <h1>Simple form example</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            id="name"
            label="Meno"
            isRequired
            messages={{
              required: "Meno je povinný údaj",
            }}
            {...methods.register("name", { required: true })}
          />
          <button type="submit">Odoslať</button>
        </form>
      </FormProvider>
    </>
  );
}

export default SimpleForm;
