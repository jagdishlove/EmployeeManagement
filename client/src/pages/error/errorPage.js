import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We apologize for the inconvenience.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
