import z from "zod";

export const blogCommentSchema = z.object({
  content: z
    .string()
    .nonempty({
      message: "errors.commentEmptyError",
    })
    .min(3, {
      message: "errors.minCommentError",
    })
    .max(1000, {
      message: "errors.maxCommentError",
    }),
});

export type BlogCommentType = z.infer<typeof blogCommentSchema>;
