import React from "react";
import { Bar, BarItem } from "components";
import Button from "../../components/Button";
import ModalTrigger from "../../components/Modal/ModalTrigger";
import Note from "../../components/Note/Note";
import NoteCreateDialog from "../../components/Note/NoteCreateDialog";
import PageBody from "../../components/PageBody";
import { trpc } from "../../utils/trpc";

const NotesPage = () => {
  const {
    data: notes,
    status,
    error,
  } = trpc.note.getNotes.useQuery(
    { limit: 10, page: 1 },
    {
      staleTime: 5 * 1000,
      select: (data) => data.notes,
    }
  );

  if (status === "loading") {
    return "Loading notes...";
  }

  if (status === "error") {
    console.error(error);
    return "Error while retrieving the notes";
  }

  return (
    <PageBody>
      <Bar>
        <BarItem>
          <h1>My notes</h1>
        </BarItem>
        <BarItem>
          <ModalTrigger>
            <Button>Add new note</Button>
            <NoteCreateDialog />
          </ModalTrigger>
        </BarItem>
      </Bar>

      <NotesList notes={notes} />
    </PageBody>
  );
};

NotesPage.auth = true;

export default NotesPage;

type NotesListProps = {
  notes: Note[];
};

const NotesList = ({ notes }: NotesListProps) => {
  if (!notes.length) {
    return (
      <p>
        {
          "You don't have any notes. You can add them with 'Add new note' button."
        }
      </p>
    );
  }

  return (
    <ul className="notes-list list--unstyled">
      {notes?.map((note) => (
        <li key={note.id}>
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
};

