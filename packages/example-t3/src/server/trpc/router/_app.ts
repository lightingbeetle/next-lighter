import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { noteRouter } from "./note/note.router";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  users: userRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;