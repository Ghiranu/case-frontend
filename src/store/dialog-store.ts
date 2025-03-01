import { create } from "zustand";

import { PostDTO } from "../types/post-dto";

interface DialogState {
  isDialogOpen: boolean;
  selectedPost: PostDTO | null;
  actions: {
    handleOpenDialog: () => void;
    handleCloseDialog: () => void;
    setSelectedPost: (post: PostDTO | null) => void;
  };
}

export const useDialogStore = create<DialogState>()((set) => ({
  isDialogOpen: false,
  selectedPost: null,
  actions: {
    handleOpenDialog: () => set({ isDialogOpen: true }),
    handleCloseDialog: () => set({ isDialogOpen: false, selectedPost: null }),
    setSelectedPost: (post) => set({ selectedPost: post }),
  },
}));

export const useDialogStoreActions = () =>
  useDialogStore((state) => state.actions);
export const useSelectedPost = () =>
  useDialogStore((state) => state.selectedPost);
export const useIsDialogOpen = () =>
  useDialogStore((state) => state.isDialogOpen);
