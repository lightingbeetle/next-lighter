import { router } from "../../trpc";
import {
  createNoteProcedure,
  deleteNoteProcedure,
  findAllNotesProcedure,
  findNoteProcedure,
  updateNoteProcedure,
} from "./note.procedures";

export const noteRouter = router({
  createNote: createNoteProcedure,
  updateNote: updateNoteProcedure,
  deleteNote: deleteNoteProcedure,
  getNote: findNoteProcedure,
  getNotes: findAllNotesProcedure,
});
