import React from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import Bar, { BarItem } from "../Bar";
import Button from "../Button";
import Card, { CardSection, CardTitle } from "../Card";
import ModalTrigger from "../Modal/ModalTrigger";
import NoteEditDialog from "./NoteEditDialog";
import { Note } from "./types";

type NoteProps = {
  note: Note;
};

const Note = ({ note }: NoteProps) => {
  const date = new Date(note.createdAt);
  const prettyDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const utils = trpc.useContext();
  const { mutate: deleteNote } = trpc.note.deleteNote.useMutation({
    onSuccess() {
      utils.note.getNotes.invalidate({ limit: 10, page: 1 });
      toast("Note deleted successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error) {
      console.log(error);
      toast(error.message, {
        type: "error",
        position: "top-right",
      });
    },
  });

  return (
    <Card className="note">
      <CardSection className="note__detail">
        <CardTitle className="note__title">
          {note.title.length > 20
            ? note.title.substring(0, 20) + "..."
            : note.title}
        </CardTitle>
        <p className="note__content">
          {note.content.length > 210
            ? note.content.substring(0, 210) + "..."
            : note.content}
        </p>
      </CardSection>
      <hr className="no-mrg-bottom" />
      <CardSection className="note__meta">
        <p className="note_date">{prettyDate}</p>
        <Bar>
          <BarItem>
            <ModalTrigger>
              <Button purpose="secondary">Edit</Button>
              <NoteEditDialog note={note} />
            </ModalTrigger>
          </BarItem>
          <BarItem>
            <Button
              purpose="link"
              onPress={() => {
                deleteNote({ noteId: note.id });
              }}
            >
              Delete
            </Button>
          </BarItem>
        </Bar>
      </CardSection>
    </Card>
  );
};

export default Note;
