import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Forms/Input";

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Simple form</legend>
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
          <div>
            <button type="submit">Odoslať</button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default SimpleForm;
