import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PostDTO } from "../types/post-dto";
import toast from "react-hot-toast";
import {
  API_BASE_URL,
  POST_ACTION_NAME,
  SUCCESS_TOAST_MESSAGE,
} from "../utils/constants";
import { useApplicationStateStoreActions } from "../store/application-state-store";
import { usePostStoreActions } from "../store/post-store";

export const useUpdatePostMutation = () => {
  const { updatePost } = usePostStoreActions();
  const { setIsErrorTriggered, setIsLoading } =
    useApplicationStateStoreActions();

  return useMutation({
    mutationFn: async (post: PostDTO) => {
      setIsLoading(true);
      const { data } = await axios.patch(`${API_BASE_URL}/${post.id}`, post);
      updatePost(data);
      return data;
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(SUCCESS_TOAST_MESSAGE(POST_ACTION_NAME.UPDATED));
    },
    onError: () => {
      setIsLoading(false);
      setIsErrorTriggered(true);
    },
  });
};
