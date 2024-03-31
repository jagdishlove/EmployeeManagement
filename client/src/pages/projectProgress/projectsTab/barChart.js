import React from "react";
import { DialogContentText } from "@mui/material";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#666">
        {`${payload.value}`}
      </text>
    </g>
  );
};

const BarChartComponent = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );

  const data = [
    {
      name: "Actual Implementation Cost",
      value: Math.min(dashboardProjectdetails.actualImplementationCost, 100),
    },
    {
      name: "Projected Implementation Cost",
      value: Math.min(dashboardProjectdetails.projectedImplementationCost, 100),

      fill: "#20D7FE",
    },
    {
      name: "Budget",
      value: Math.min(dashboardProjectdetails.budget, 100),
    },
    {
      name: "Time",
      value: Math.min(dashboardProjectdetails.time, 100),
    },
  ];

  return (
    <DialogContentText>
      <BarChart width={300}
       height={300} data={data} margin={{ top: 20 }}>
        <XAxis dataKey="none" />
        <YAxis tick={<CustomizedYAxisTick />} />
        <Tooltip />

        <Bar dataKey="value" />
      </BarChart>
    </DialogContentText>
  );
};

export default BarChartComponent;
