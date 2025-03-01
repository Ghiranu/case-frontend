import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PostDTO } from "../types/post-dto";
import { POSTS_LOCAL_STORAGE_KEY_NAME } from "../utils/constants";

interface PostState {
  posts: PostDTO[];
  actions: {
    setPosts: (posts: PostDTO[]) => void;
    addPost: (post: PostDTO) => void;
    updatePost: (post: PostDTO) => void;
    deletePost: (id?: number) => void;
  };
}

const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      actions: {
        setPosts: (posts) => set({ posts }),
        addPost: (post) => {
          const insideStorePosts = get().posts;
          const firstElementId = insideStorePosts[0].id;
          const isFirstElementIdWithTripleDigits =
            firstElementId?.toString().length === 3;
          const lastElementId =
            insideStorePosts[insideStorePosts.length - 1].id;
          const newPostId = isFirstElementIdWithTripleDigits
            ? Number(firstElementId) + 1
            : Number(lastElementId) + 1;

          return set({
            posts: [{ ...post, id: newPostId }, ...get().posts],
          });
        },

        updatePost: (updatedPost) =>
          set({
            posts: get().posts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            ),
          }),

        deletePost: (id) =>
          set({ posts: get().posts.filter((post) => post.id !== id) }),
      },
    }),
    {
      name: POSTS_LOCAL_STORAGE_KEY_NAME,
      partialize: (state) => ({ posts: state.posts }),
    }
  )
);

export const usePostStoreActions = () => usePostStore((state) => state.actions);

export const usePosts = () => usePostStore((state) => state.posts);
