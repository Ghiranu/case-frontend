import { useEffect, useState } from "react";
import { PostDTO } from "../types/post-dto";
import useDebounce from "./useDebounce";

const useSearchPost = (posts: PostDTO[], paginatedPosts: PostDTO[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postsToDisplay, setPostsToDisplay] =
    useState<PostDTO[]>(paginatedPosts);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const shouldTriggerSearchPost = debouncedSearchQuery.length > 0;

    if (shouldTriggerSearchPost) {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setPostsToDisplay(filteredPosts);
    } else {
      setPostsToDisplay(paginatedPosts);
    }
  }, [debouncedSearchQuery, posts, paginatedPosts]);
  return {
    postsToDisplay,
    setSearchQuery,
    searchQuery,
    debouncedSearchQuery,
  };
};

export default useSearchPost;
