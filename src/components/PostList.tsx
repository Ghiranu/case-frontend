import { Grid2 as Grid } from "@mui/material";
import { PostDTO } from "../types/post-dto";
import { PostCard } from "./PostCard";

type PostList = {
  posts: PostDTO[];
  handleOpenCloseDeleteDialog: () => void;
};

const PostList: React.FC<PostList> = ({
  posts,
  handleOpenCloseDeleteDialog,
}) => {
  return (
    <Grid container spacing={3}>
      {posts?.map((post) => (
        <Grid key={post?.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
          <PostCard
            postDetails={post}
            handleOpenDeleteDialog={handleOpenCloseDeleteDialog}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
