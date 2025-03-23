import getBlogByComments from "./getBlogByComments";
import getBlogByLatest from "./getBlogByLatest";
import getBlogByOldest from "./getBlogByOldest";
import getBlogByPopular from "./getBlogByPopular";

export type OrderByType = "newest" | "oldest" | "popular" | "comments";

export interface BlogBody {
  cursor?: string | null;
  query?: string | null;
  orderBy?: OrderByType | null;
  authorId?: string | null;
}

export default async function getBlogs(body: BlogBody) {
  switch (body.orderBy) {
    case "newest": {
      const query = await getBlogByLatest(body);
      return query;
    }

    case "oldest": {
      console.log("oldest");
      const query = await getBlogByOldest(body);
      return query;
    }

    case "popular": {
      console.log("popular");

      const query = await getBlogByPopular(body);
      return query;
    }

    case "comments": {
      const query = await getBlogByComments(body);
      return query;
    }

    default: {
      console.log("popular");

      const query = await getBlogByPopular(body);
      return query;
    }
  }
}
