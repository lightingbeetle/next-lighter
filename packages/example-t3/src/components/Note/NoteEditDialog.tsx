import React from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import Dialog from "../Dialog/Dialog";
import { useModal } from "../Modal/useModal";
import NoteForm from "./NoteForm";
import type { Note } from "./types";

type NoteEditDialogProps = {
  note: Note;
};

const NoteEditDialog = ({ note }: NoteEditDialogProps) => {
  const { close } = useModal();
  const utils = trpc.useContext();
  const { isLoading, mutate: editNote } = trpc.note.updateNote.useMutation({
    onSuccess() {
      utils.note.getNotes.invalidate({ limit: 10, page: 1 });
      close();
      toast("Note updated successfully", {
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
    <Dialog title="Edit note">
      <NoteForm
        note={note}
        onSubmit={(data) =>
          editNote({ params: { noteId: note.id }, body: data })
        }
        submitText={isLoading ? "Submiting" : "Edit note"}
      />
    </Dialog>
  );
};

export default NoteEditDialog;
