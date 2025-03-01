import { useMemo, useState } from "react";
import { PostDTO } from "../types/post-dto";

const POSTS_PER_PAGE = 9;

const usePagination = (posts: PostDTO[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(
    () =>
      posts?.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      ),
    [posts, currentPage]
  );

  const handleSetCurrentPage = (value: number) => setCurrentPage(value);

  return {
    totalPages,
    currentPage,
    paginatedPosts,
    handleSetCurrentPage,
  };
};

export default usePagination;
