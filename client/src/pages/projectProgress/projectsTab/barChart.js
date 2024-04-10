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
      fill: "#81C84B",
    },
    {
      name: "Projected Implementation Cost",
      value: Math.min(dashboardProjectdetails.projectedImplementationCost, 100),
      fill: "#20D7FE",
    },
    {
      name: "Budget",
      value: Math.min(dashboardProjectdetails.budget, 100),
      fill: "#33A1EC",
    },
    {
      name: "Time",
      value: Math.min(dashboardProjectdetails.time, 100),
      fill: "#FFA07A",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: "#fff", padding: "5px" }}>
          <p>{`${data.name}: ${data.value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <DialogContentText>
      <BarChart width={350} height={360} data={data}>
        <XAxis
          dataKey="none"
          label={{
            value: "FDX",
            angle: 360,
            position: "insideBottomMiddle",
          }}
        />
        <YAxis
          tick={<CustomizedYAxisTick />}
          label={{
            value: "Progress in %",
            angle: -90,
            position: "insideRight",
            offset: 55,
          }}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="value" />
      </BarChart>
    </DialogContentText>
  );
};

export default BarChartComponent;
