import { useState } from "react";
import { useSelectedPost } from "../store/dialog-store";
import { useDeletePostMutation } from "./useDeletePostMutation";

const useConfirmDeleteDialog = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const selectedPost = useSelectedPost();

  const deletePostMutation = useDeletePostMutation();

  const handleOpenCloseDeleteDialog = () =>
    setIsDeleteDialogOpen((previousValue) => !previousValue);

  const deleteDialogTitle = "Delete post";
  const primaryDeleteDialogButtonText = "Delete";

  const handleDeletePost = () => {
    deletePostMutation.mutate(selectedPost?.id);
    handleOpenCloseDeleteDialog();
  };

  return {
    isDeleteDialogOpen,
    deleteDialogTitle,
    primaryDeleteDialogButtonText,
    handleOpenCloseDeleteDialog,
    handleDeletePost,
  };
};

export default useConfirmDeleteDialog;
