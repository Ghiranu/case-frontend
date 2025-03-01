export const POST_TITLE_VALIDATION_MESSAGE = "Title cannot be empty.";

export const POST_BODY_VALIDATION_MESSAGE = "Body cannot be empty.";

export const MINIMUM_CHARACTERS = 1;

export const POST_DEFAULT_VALUES = {
  title: "",
  body: "",
  userId: 1,
};

export const SUCCESS_TOAST_MESSAGE = (action: string) =>
  `Post ${action} successfully.`;

export const POSTS_LOCAL_STORAGE_KEY_NAME = "post-storage";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const POST_ACTION_NAME = {
  CREATED: "created",
  UPDATED: "updated",
  DELETED: "deleted",
};
