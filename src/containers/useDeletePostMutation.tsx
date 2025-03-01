import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {
  API_BASE_URL,
  POST_ACTION_NAME,
  SUCCESS_TOAST_MESSAGE,
} from "../utils/constants";
import { useApplicationStateStoreActions } from "../store/application-state-store";
import { usePostStoreActions } from "../store/post-store";

export const useDeletePostMutation = () => {
  const { deletePost } = usePostStoreActions();
  const { setIsErrorTriggered, setIsLoading } =
    useApplicationStateStoreActions();

  return useMutation({
    mutationFn: async (id?: number) => {
      setIsLoading(true);
      await axios.delete(`${API_BASE_URL}/${id}`);
      deletePost(id);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(SUCCESS_TOAST_MESSAGE(POST_ACTION_NAME.DELETED));
    },
    onError: () => {
      setIsLoading(false);
      setIsErrorTriggered(true);
    },
  });
};
