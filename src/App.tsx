import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import usePagination from "./containers/usePagination";
import { usePosts } from "./store/post-store";
import { Toaster } from "react-hot-toast";
import CreatePostForm from "./components/CreatePostForm";
import useCreatePost from "./containers/useCreatePost";
import useConfirmDeleteDialog from "./containers/useConfirmDeleteDialog";
import SkeletonCards from "./components/SkeletonCards";
import {
  useIsErrorTriggered,
  useIsLoading,
} from "./store/application-state-store";
import ErrorContainer from "./components/ErrorContainer";
import { useFetchPosts } from "./containers/useFetchPosts";
import SearchBar from "./components/SearchBar";

import useSearchPost from "./containers/useSearchPost";
import { lazy, Suspense } from "react";

const PostList = lazy(() => import("./components/PostList"));

const CustomDialog = lazy(() => import("./components/CustomDialog"));

function App() {
  const posts = usePosts();

  const isLoading = useIsLoading();
  const isErrorTriggered = useIsErrorTriggered();

  useFetchPosts();

  const { totalPages, currentPage, paginatedPosts, handleSetCurrentPage } =
    usePagination(posts);

  const { postsToDisplay, setSearchQuery, searchQuery, debouncedSearchQuery } =
    useSearchPost(posts, paginatedPosts);

  const shouldDisplayPagination =
    totalPages > 1 && debouncedSearchQuery.length === 0;

  const {
    isDialogOpen,
    handleOpenDialog,
    handleCloseCreatePostDialog,
    handleMutatePost,
    dialogTitle,
    primaryButtonText,
    shouldDisablePrimaryButton,
    control,
    errors,
  } = useCreatePost();

  const {
    isDeleteDialogOpen,
    deleteDialogTitle,
    primaryDeleteDialogButtonText,
    handleOpenCloseDeleteDialog,
    handleDeletePost,
  } = useConfirmDeleteDialog();

  if (isLoading) {
    return <SkeletonCards />;
  }

  if (isErrorTriggered) {
    return <ErrorContainer />;
  }
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              color: "#FFF",
              background: "green",
            },
          },
          error: {
            style: {
              color: "#FFF",
              background: "red",
            },
          },
          position: "top-center",
        }}
      />
      <CustomDialog
        secondaryButtonHandler={handleCloseCreatePostDialog}
        isDialogOpen={isDialogOpen}
        shouldDisablePrimaryButton={shouldDisablePrimaryButton}
        primaryButtonText={primaryButtonText}
        title={dialogTitle}
        handleClose={handleCloseCreatePostDialog}
        primaryButtonHandler={handleMutatePost}
      >
        <CreatePostForm control={control} errors={errors} />
      </CustomDialog>
      <CustomDialog
        isDialogOpen={isDeleteDialogOpen}
        handleClose={handleOpenCloseDeleteDialog}
        primaryButtonHandler={handleDeletePost}
        primaryButtonText={primaryDeleteDialogButtonText}
        title={deleteDialogTitle}
        secondaryButtonHandler={handleOpenCloseDeleteDialog}
      >
        <Typography>Are you sure you want to delete this post?</Typography>
      </CustomDialog>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box display="flex" gap="16px" marginBottom="16px">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Button
            variant="contained"
            sx={{ width: "120px" }}
            onClick={handleOpenDialog}
          >
            Add Post
          </Button>
        </Box>
        <Suspense fallback={<SkeletonCards />}>
          <PostList
            posts={postsToDisplay}
            handleOpenCloseDeleteDialog={handleOpenCloseDeleteDialog}
          />
        </Suspense>

        {shouldDisplayPagination && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => handleSetCurrentPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
