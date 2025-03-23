import getBlogs from "@/lib/fetcher/blogs/getBlogs";
import BlogCard from "../blogs/BlogCard";

interface UserBlogSectionProps {
  userId: string;
}

const UserBlogSection = async ({ userId }: UserBlogSectionProps) => {
  const blogs = await getBlogs({
    authorId: userId,
  });

  return (
    <section className="w-full">
      {blogs.map((blog) => (
        <BlogCard data={blog} key={blog.id} />
      ))}
    </section>
  );
};

export default UserBlogSection;
