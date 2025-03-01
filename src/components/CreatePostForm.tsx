import { Box, TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { PostDataSchema } from "../utils/validation";

type CreatePostFormProps = {
  control: Control<PostDataSchema>;
  errors: FieldErrors<PostDataSchema>;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ control, errors }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px 0px",
      }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <TextField
            multiline
            {...field}
            label="Body"
            error={!!errors.body}
            helperText={errors.body?.message}
          />
        )}
      />
    </Box>
  );
};

export default CreatePostForm;
