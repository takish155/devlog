import getBlogs, { OrderByType } from "./blogs/getBlogs";

export default async function getHomeFirstTenBlogs(orderBy: OrderByType) {
  const blogs = await getBlogs({
    orderBy,
  });

  return {
    blogs,
    cursor: blogs[blogs.length - 1].id,
  };
}
