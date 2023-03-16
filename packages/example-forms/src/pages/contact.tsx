import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Error } from "components";
import MarketingCheckbox from "../components/MarketingCheckbox";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

function ContactForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      marketing: false,
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

    const responseData = await response.json();

    console.log(responseData);

    if (response.status > 200) {
      // this could be more granularised if we do server side validation of fields for example
      setError("root.serverError", {
        type: response.status.toString(),
        message: responseData.message,
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

  console.log(errors);

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
            {...methods.register("name", {
              required: true,
            })}
          />
          <Input
            type="email"
            pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$"
            id="email"
            label="Email"
            isRequired
            {...methods.register("email", {
              required: "Email je povinný údaj",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/,
                message: "Email je v nesprávnom tvare",
              },
            })}
          />
          <Input
            type="tel"
            id="phoneNumber"
            label="Telefónne číslo"
            hint="Musí začínať 00 alebo +"
            {...methods.register("phoneNumber", {
              pattern: {
                value: /^(\+|00)[0-9]{7,32}$/,
                message: "Číslo musí byť v medzinárodnom formáte",
              },
            })}
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
          {errors?.root?.serverError && (
            <Error>{errors.root.serverError.message}</Error>
          )}
          <button onClick={() => clearErrors("root.serverError")} type="submit">
            Odoslať
          </button>
        </form>
      </FormProvider>
    </>
  );
}

export default ContactForm;
