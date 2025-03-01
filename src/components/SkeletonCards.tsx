import { Container, Grid2 as Grid, Skeleton } from "@mui/material";

const SkeletonCards = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {Array.from({ length: 9 }).map(() => (
          <Grid
            key={crypto.randomUUID()}
            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
          >
            <Skeleton height="260px" width="370px" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SkeletonCards;
