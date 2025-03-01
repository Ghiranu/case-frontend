import { useQuery } from "@tanstack/react-query";
import { useApplicationStateStoreActions } from "../store/application-state-store";
import { API_BASE_URL, POSTS_LOCAL_STORAGE_KEY_NAME } from "../utils/constants";
import axios from "axios";
import { usePosts, usePostStoreActions } from "../store/post-store";

export const useFetchPosts = () => {
  const posts = usePosts();
  const { setPosts } = usePostStoreActions();
  const { setIsErrorTriggered, setIsLoading } =
    useApplicationStateStoreActions();

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const storedPosts = JSON.parse(
          localStorage.getItem(POSTS_LOCAL_STORAGE_KEY_NAME) || "[]"
        );
        if (storedPosts?.state?.posts?.length) {
          setPosts(storedPosts.state.posts);
          setIsLoading(false);
          return storedPosts.state.posts;
        }

        const { data } = await axios.get(API_BASE_URL);
        setPosts(data);

        return data;
      } catch (error) {
        setIsErrorTriggered(true);
        setIsLoading(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    initialData: posts.length > 0 ? posts : undefined,
  });
};
