import React from "react";
import { DialogContentText } from "@mui/material";
import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";

const BarChart = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );

  console.log("dashboardProjectdetails", dashboardProjectdetails);
  return (
    <DialogContentText>
      <MuiBarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["FDX"],
          },
        ]}
        series={[
          { data: [25] },
          { data: [75] },
          { data: [100] },
          { data: [10] },
        ]}
        width={300}
        height={300}
        yAxis={[
          {
            scaleType: "linear",
            tickValues: [0, 25, 50, 75, 100],
          },
        ]}
      />
    </DialogContentText>
  );
};

export default BarChart;
