import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input, TextArea, Error } from "components";
import MarketingCheckbox from "../components/MarketingCheckbox";

function ContactForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "@",
      phoneNumber: "",
      message: "",
      marketing: false,
      // This is just to make the "field" available in TypeScript. It will never
      // have a value assigned to it and JSON.stringify will filter it out.
      serverError: undefined,
    },
  });

  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  // onSubmit will not be called if there are validation errors in formState.errors
  const onSubmit = async (data) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, error } = await response.json();

    if (!status || error) {
      // this could be more granularised if we do server side validation of fields for example
      setError("serverError", {
        type: "server",
        message: error,
      });

      return;
    }

    // reset entire form to default values after submit success
    reset();
  };

  // TODO: don't create component in the render - memoize or refactor out
  const SuccessMessage = () => (
    <div>
      <h3>Ďakujeme!</h3>
      <p>Vaša správa bola úspešne odoslaná. Čoskoro vás budeme kontaktovať.</p>
    </div>
  );

  return (
    <>
      {isSubmitSuccessful && <SuccessMessage />}
      <FormProvider {...methods}>
        {/* noValidate will disable browser native validation */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Input
            type="email"
            pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$"
            id="email"
            label="Email"
            isRequired
            messages={{
              required: "Email je povinný údaj",
            }}
            {...methods.register("email", { required: true })}
          />
          <Input
            type="tel"
            id="phoneNumber"
            label="Telefónne číslo"
            hint="Musí začínať 00 alebo +"
            {...methods.register("phoneNumber", {
              pattern: /^(\+|00)[0-9]{7,32}$/,
            })}
            messages={{
              pattern: "Číslo musí byť v medzinárodnom formáte",
            }}
          />
          <TextArea
            label="Vaša správa"
            id="message"
            {...methods.register("message")}
          />
          <p>
            Spoločnosť XXX je oprávnená spracúvať moje osobné údaje vyplnené v
            kontaktnom formulári na účely spracovania mojej požiadavky.
            Oboznámil (a) som sa s informáciami v sekcii{" "}
            <a href="/" target="_blank" rel="noreferrer">
              Ochrana osobných údajov
            </a>
          </p>
          <MarketingCheckbox {...methods.register("marketing")} />
          {errors?.serverError && <Error>{errors.serverError.message}</Error>}
          <button onClick={() => clearErrors("serverError")} type="submit">
            Odoslať
          </button>
        </form>
      </FormProvider>
    </>
  );
}

export default ContactForm;
