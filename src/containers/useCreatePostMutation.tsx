import { useMutation } from "@tanstack/react-query";
import { usePostStoreActions } from "../store/post-store";
import axios from "axios";
import { PostDTO } from "../types/post-dto";
import toast from "react-hot-toast";
import {
  API_BASE_URL,
  POST_ACTION_NAME,
  SUCCESS_TOAST_MESSAGE,
} from "../utils/constants";
import { useApplicationStateStoreActions } from "../store/application-state-store";

export const useCreatePostMutation = () => {
  const { addPost } = usePostStoreActions();
  const { setIsErrorTriggered, setIsLoading } =
    useApplicationStateStoreActions();

  return useMutation({
    mutationFn: async (newPost: PostDTO) => {
      setIsLoading(true);
      const { data } = await axios.post(API_BASE_URL, newPost);
      addPost(data);
      return data;
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(SUCCESS_TOAST_MESSAGE(POST_ACTION_NAME.CREATED));
    },
    onError: () => {
      setIsLoading(false);
      setIsErrorTriggered(true);
    },
  });
};
