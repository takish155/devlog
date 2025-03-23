import { blogSchema } from "@/schemas/blog.schema";

export default async function checkBlogBodyMiddleware(
  data?: { body: any },
  passedData?: any[]
) {
  const validation = blogSchema.safeParse(data!.body);

  if (!validation.success) {
    return {
      pass: false,
      message: "Invalid request body",
      status: 400,
    };
  }

  return {
    pass: true,
    data: validation.data,
  };
}
