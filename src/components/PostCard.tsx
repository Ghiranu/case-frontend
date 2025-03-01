import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDialogStoreActions } from "../store/dialog-store";
import { PostDTO } from "../types/post-dto";

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  cursor: "pointer",
});

interface PostCardProps {
  postDetails: PostDTO;
  handleOpenDeleteDialog: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  postDetails,
  handleOpenDeleteDialog,
}) => {
  const { title, body } = postDetails;

  const { setSelectedPost, handleOpenDialog } = useDialogStoreActions();

  const handleEditPost = () => {
    setSelectedPost(postDetails);
    handleOpenDialog();
  };

  const handleDeletePost = () => {
    setSelectedPost(postDetails);
    handleOpenDeleteDialog();
  };

  return (
    <StyledCard>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={handleEditPost} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDeletePost} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" mt={1}>
          {body}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};
