import z from "zod";

export const blogCommentSchema = z.object({
  content: z
    .string()
    .nonempty({
      message: "form.errors.commentEmptyError",
    })
    .min(3, {
      message: "form.errors.minCommentError",
    })
    .max(1000, {
      message: "form.errors.maxCommentError",
    }),
});

export type BlogCommentType = z.infer<typeof blogCommentSchema>;
