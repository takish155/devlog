import z from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "titleEmptyError" })
    .min(3, { message: "minTitleError" })
    .max(50, { message: "maxTitleError" }),
  description: z.string().max(300, { message: "maxDescriptionError" }),
  content: z
    .string()
    .nonempty({ message: "contentEmptyError" })
    .min(10, { message: "minContentError" })
    .max(10000, { message: "maxContentError" }),
});

export type BlogSchema = z.infer<typeof blogSchema>;
