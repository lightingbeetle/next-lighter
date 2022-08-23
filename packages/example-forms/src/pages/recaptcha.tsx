import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import Input from "../components/Input";

function RecaptchaForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const methods = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    alert(`submitted ${JSON.stringify(data)} with token ${token}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset>
          <legend>Recaptcha form</legend>
          <Input
            type="text"
            id="name"
            label="Meno"
            isRequired
            {...methods.register("name", { required: "Meno je povinný údaj" })}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            badge="inline"
            sitekey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "NOT_AVAILABLE"
            }
          />
          <div>
            <button type="submit">Odoslať</button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default RecaptchaForm;
