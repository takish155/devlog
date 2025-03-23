import z from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "titleEmptyError" })
    .min(3, { message: "minTitleError" })
    .max(100, { message: "maxTitleError" }),
  description: z.string().max(300, { message: "maxDescriptionError" }),
  content: z
    .string()
    .nonempty({ message: "contentEmptyError" })
    .min(10, { message: "minContentError" })
    .max(15000, { message: "maxContentError" }),
  thumbnail: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
