import { Box, Container, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorContainer = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: "red" }} />
        <Typography variant="h5" color="error">
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1">
          Please refresh the page or try again later.
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorContainer;
