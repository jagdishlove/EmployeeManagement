import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bgcolor="rgba(255, 255, 255, 0.7)"
      zIndex="1000"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingOverlay;
