import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import { LineChart } from "@mui/x-charts/LineChart";
import { useSelector } from "react-redux";

function WorkspaceLineChart({ handleClickOpen, selectedOption }) {
  const getXAxisData = () => {
    switch (selectedOption?.value) {
      case "SEVEN_DAYS":
        return [0, 1, 2, 3, 4, 5, 6, 7]; // Example: 7 days
      case "ONE_MONTH":
        return [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ]; // Example: 30 days
      case "SIX_MONTHS":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Example: 6 months
      case "ONE_YEAR":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Example: 1 year
      case "ALL":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example: All data
      default:
        return [];
    }
  };

  const workSpaceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.workSpaceData
  );

  console.log("X-Axis Data:", getXAxisData());

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

      <LineChart
        xAxis={[{ data: getXAxisData(), label: "Duration" }]}
        yAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Time" }]}
        series={[
          {
            name: "Time",
            data: workSpaceData?.durations
              ? [
                  0,
                  ...workSpaceData.durations.map((item) => item.projectedHours),
                ]
              : [],

            color: "#50C01B",
          },
          {
            name: "Duration",
            data: workSpaceData?.durations
              ? [0, ...workSpaceData.durations.map((item) => item.actualHours)]
              : [],
            color: "#FF66FF",
          },
        ]}
        axes={[
          {
            primary: true,
            type: "linear",
            position: "bottom",
            label: "Duration",
          },
          { type: "linear", position: "left", label: "Time" },
        ]}
        width={500}
        height={300}
      />
    </>
  );
}

export default WorkspaceLineChart;
