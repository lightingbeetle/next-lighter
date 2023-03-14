import React from "react";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TypeOf } from "zod";
import { object, string } from "zod";
import type { Note } from "./types";
import Button from "../Button";
import { Input, Textarea } from "../Forms";

const noteFormSchema = object({
  title: string().min(1, "Title is required"),
  content: string().min(1, "Content is required"),
});

type NoteFormValues = TypeOf<typeof noteFormSchema>;

type NoteFormProps = {
  onSubmit: SubmitHandler<NoteFormValues>;
  submitText?: React.ReactNode;
  note?: Note;
};

const NoteForm = ({
  onSubmit,
  submitText = "Create Note",
  note,
}: NoteFormProps) => {
  const methods = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: note,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        isRequired
        {...methods.register("title", { required: true })}
        errorMessage={errors.title?.message}
      />
      <Textarea
        label="Content"
        isRequired
        {...methods.register("content", { required: true })}
        errorMessage={errors.content?.message}
      />
      <Button type="submit">{submitText}</Button>
    </form>
  );
};

export default NoteForm;
