import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import loader from "./FullScreenLoaderStyle.module.css";
const FullScreenLoader = () => {
  const isLoading = useSelector(
    (state) => state.persistData.loaderReducer.globalLoading,
  );

  if (!isLoading) {
    return null;
  }
  return (
    <Box className={loader.container}>
      <Box className={loader.loader}></Box>
    </Box>
  );
};

export default FullScreenLoader;
