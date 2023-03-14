import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/client";
import { filterQuery } from "./note.schema";
import { createNoteSchema } from "./note.schema";
import { params } from "./note.schema";
import { updateNoteSchema } from "./note.schema";
import { protectedProcedure } from "../../trpc";

export const createNoteProcedure = protectedProcedure
  .input(createNoteSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const note = await prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          category: input.category,
          published: input.published,
          author: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      return {
        status: "success",
        data: {
          note,
        },
      };
    } catch (error) {
      throw error;
    }
  });

export const updateNoteProcedure = protectedProcedure
  .input(updateNoteSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      // NOTE: should this be middleware?
      checkIfUserIsNoteAuthor({
        noteId: input.params.noteId,
        authorId: ctx.session.user.id,
      });

      const updatedNote = await prisma.note.update({
        where: { id: input.params.noteId },
        data: input.body,
        include: {
          author: true,
        },
      });

      return {
        status: "success",
        note: updatedNote,
      };
    } catch (error) {
      throw error;
    }
  });

export const findNoteProcedure = protectedProcedure
  .input(params)
  .query(async ({ input, ctx }) => {
    try {
      const note = await prisma.note.findFirst({
        where: { id: input.noteId, authorId: ctx.session.user.id },
      });

      if (!note) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note with that ID not found",
        });
      }

      return {
        status: "success",
        note,
      };
    } catch (error) {
      throw error;
    }
  });

export const findAllNotesProcedure = protectedProcedure
  .input(filterQuery)
  .query(async ({ input, ctx }) => {
    try {
      const page = input.page || 1;
      const limit = input.limit || 10;
      const skip = (page - 1) * limit;

      const notes = await prisma.note.findMany({
        where: { authorId: ctx.session.user.id },
        skip,
        take: limit,
      });

      return {
        status: "success",
        results: notes.length,
        notes,
      };
    } catch (error) {
      throw error;
    }
  });

export const deleteNoteProcedure = protectedProcedure
  .input(params)
  .mutation(async ({ input, ctx }) => {
    try {
      checkIfUserIsNoteAuthor({
        noteId: input.noteId,
        authorId: ctx.session.user.id,
      });

      await prisma.note.delete({ where: { id: input.noteId } });

      return {
        status: "success",
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Note with that ID not found",
          });
        }
      }
      throw error;
    }
  });

async function checkIfUserIsNoteAuthor({
  noteId,
  authorId,
}: {
  noteId: string;
  authorId: string;
}) {
  const isAuthor = await prisma.note.findFirst({
    where: { id: noteId, authorId },
  });

  if (!isAuthor) {
    // NOTE: should this be rather "FORBIDDEN"?
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Note with that ID not available",
    });
  }
}
