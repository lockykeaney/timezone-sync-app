import { z } from "zod";
import bcrypt from "bcrypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const userRouter = createTRPCRouter({
  createNewUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hash = await hashPassword(input.password);
      return await ctx.db.user.create({
        data: {
          name: input.username,
          email: input.email,
          password: hash,
        },
      });
    }),
  findUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({ where: { email: input.email } });
    }),

  // getUserById: publicProcedure.query()
});
