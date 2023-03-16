import React from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import Dialog from "../Dialog/Dialog";
import { useModal } from "../Modal/useModal";
import NoteForm from "./NoteForm";

// type NoteCreateDialogProps = {};

const NoteCreateDialog = () => {
  const { close } = useModal();
  const utils = trpc.useContext();
  const { isLoading, mutate: createNote } = trpc.note.createNote.useMutation({
    onSuccess() {
      utils.note.getNotes.invalidate({ limit: 10, page: 1 });
      close();
      toast("Note created successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error) {
      close();
      toast(error.message, {
        type: "error",
        position: "top-right",
      });
    },
  });

  return (
    <Dialog title="Add note">
      <NoteForm
        onSubmit={(data) => createNote(data)}
        submitText={isLoading ? "Submiting" : "Create note"}
      />
    </Dialog>
  );
};

export default NoteCreateDialog;
