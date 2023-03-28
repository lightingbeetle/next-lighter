import { router } from "../trpc";
import { authRouter } from "./auth";
import { noteRouter } from "./note/note.router";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
