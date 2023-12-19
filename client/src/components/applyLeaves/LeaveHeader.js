import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LeaveHeader = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
 const currentMonth = currentDate.toLocaleString("default", { month: "long" }).toUpperCase();


  return (
    <Box>
      <Typography variant="h2">{currentYear}</Typography>
      <Box sx={{ border: "1px solid #008080" }}></Box>
      <Typography variant="h6" sx={{ color: "#008080", weight: "900" }}>
        <b>{currentMonth}</b>
      </Typography>
    </Box>
  );
};

export default LeaveHeader;
