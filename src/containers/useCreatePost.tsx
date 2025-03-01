import { SubmitHandler, useForm } from "react-hook-form";
import { PostDataSchema, schema } from "../utils/validation";
import { POST_DEFAULT_VALUES } from "../utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useDialogStoreActions,
  useIsDialogOpen,
  useSelectedPost,
} from "../store/dialog-store";
import { useCreatePostMutation } from "./useCreatePostMutation";
import { useUpdatePostMutation } from "./useUpdatePostMutation";

const useCreatePost = () => {
  const isDialogOpen = useIsDialogOpen();
  const selectedPost = useSelectedPost();

  const { handleOpenDialog, handleCloseDialog } = useDialogStoreActions();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostDataSchema>({
    defaultValues: selectedPost ? selectedPost : POST_DEFAULT_VALUES,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(selectedPost || { title: "", body: "" });
  }, [selectedPost, reset]);

  const addPostMutation = useCreatePostMutation();

  const updatePostMutation = useUpdatePostMutation();

  const handleCloseCreatePostDialog = () => {
    reset();
    handleCloseDialog();
  };

  const onSubmit: SubmitHandler<PostDataSchema> = (data) => {
    if (selectedPost) {
      updatePostMutation.mutate({
        title: data.title,
        body: data.body,
        id: data.id,
      });
    } else {
      addPostMutation.mutate({
        title: data.title,
        body: data.body,
        userId: data.userId || 1,
      });
    }
    handleCloseCreatePostDialog();
  };

  const handleMutatePost = handleSubmit(onSubmit);

  const isEditing = Boolean(selectedPost);

  const dialogTitle = isEditing ? "Edit post" : "Create new post";
  const primaryButtonText = isEditing ? "Update" : "Create";
  const shouldDisablePrimaryButton = Object.keys(errors).length > 0;

  return {
    isDialogOpen,
    handleOpenDialog,
    handleCloseCreatePostDialog,
    handleMutatePost,
    dialogTitle,
    primaryButtonText,
    shouldDisablePrimaryButton,
    control,
    errors,
  };
};

export default useCreatePost;
