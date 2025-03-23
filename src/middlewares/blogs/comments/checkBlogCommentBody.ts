import { blogCommentSchema } from "@/schemas/blogComment.schema";

export default async function checkBlogCommentBody(
  data?: { body: any },
  passedData?: any[]
) {
  const validation = blogCommentSchema.safeParse(data?.body);
  if (!validation.success) {
    return {
      pass: false,
      message: "Invalid request body",
      status: 400,
    };
  }

  return {
    pass: true,
  };
}
