import React, { /* useRef, */ useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import ReCAPTCHA from "react-google-recaptcha";
import { Input, TextArea, Error } from "components";
import ApprovalCheckbox from "../components/ApprovalCheckbox";

function ContactForm() {
  // ReCaptcha is not easy to work with on localhost
  // TODO: disable recaptcha in DEV environment
  // const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSuccess, setSuccess] = useState(false);
  const [formError, setFormError] = useState(null);

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "@",
      phoneNumber: "",
      message: "",
      marketing: false,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    // const token = await recaptchaRef.current.executeAsync();
    // recaptchaRef.current.reset();

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...data /* token */ }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, error } = await response.json();

    if (!status || error) {
      setFormError(error);
      return;
    }

    setSuccess(true);
  };

  // TODO: don't create component in the render - memoize or refactor out
  const SuccessMessage = () => (
    <div>
      <h3>Ďakujeme!</h3>
      <p>Vaša správa bola úspešne odoslaná. Čoskoro vás budeme kontaktovať.</p>
      <button type="button" onClick={() => setSuccess(false)}>
        Späť
      </button>
    </div>
  );

  if (isSuccess) {
    return <SuccessMessage />;
  }

  return (
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
          kontaktnom formulári na účely spracovania mojej požiadavky. Oboznámil
          (a) som sa s informáciami v sekcii{" "}
          <a href="/" target="_blank" rel="noreferrer">
            Ochrana osobných údajov
          </a>
        </p>
        <ApprovalCheckbox {...methods.register("marketing")} />
        {formError && <Error>{formError}</Error>}
        {/* <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          badge="inline"
          sitekey={
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "NOT_AVAILABLE"
          }
        /> */}
        <button type="submit">Odoslať</button>
      </form>
    </FormProvider>
  );
}

export default ContactForm;
