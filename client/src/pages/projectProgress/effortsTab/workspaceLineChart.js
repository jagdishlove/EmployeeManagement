import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";

function WorkspaceLineChart({ handleClickOpen }) {
  const workSpaceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.workSpaceData?.durations
  );

  // Function to calculate tick values based on selected option

  return (
    <>
      <Grid container>
        <Grid item xs={11}>
          <Typography sx={{ color: "#000000", fontSize: "24px" }}>
            Projected Vs Actual Progress
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <OpenInFullOutlinedIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ paddingLeft: "20px" }}>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: "#50C01B",
                marginRight: "5px",
              }}
            />
            <Typography variant="body1" fontWeight="bold">
              Projected Hours
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: "#FF66FF",
                marginRight: "5px",
              }}
            />
            <Typography variant="body1" fontWeight="bold">
              Actual Hours
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={workSpaceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="projectedHours"
            stroke="#50C01B"
            activeDot={{ r: 8 }}
            name="projectedHourst"
          />
          <Line
            type="monotone"
            dataKey="actualHours"
            stroke="#FF66FF"
            activeDot={{ r: 8 }}
            name="actualHours"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default WorkspaceLineChart;
