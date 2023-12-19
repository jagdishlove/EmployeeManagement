import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const ActivityChart = () => {
  const historyData = useSelector(
    (state) => state?.nonPersist?.historyData.historyData
  );

  const data = historyData?.legendList;

  // Filter out data points with a value of 0
  const filteredData = data?.filter((entry) => entry.value > 0);

  // Calculate the total number of hours
  const totalHours = filteredData?.reduce((sum, entry) => sum + entry.value, 0);

  const colorPalette = {
    TASKS: "#0088FE",
    MEETINGS: "#FFBB28",
    BREAKS: "#00C49F",
    OTHERS: "#FFC0CB",
  };
  // Calculate the percentage for each data point
  const dataWithPercentage = filteredData?.map((entry) => ({
    name: entry.name,
    hours: (entry.value / totalHours) * 100,
    color: colorPalette[entry.name], // Define color based on entry.name
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor="middle">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const formatTooltip = (value) => {
    // Format the tooltip value to match the pie chart format
    return `${value.toFixed(2)}%`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Typography
        style={{
          color: "#000000",
          textAlign: "center",
          margin: "0",
        }}
        variant="h6"
      >
       <b> MONTHLY ACTIVITY CHART</b> 
      </Typography>

      {filteredData?.length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        <PieChart width={400} height={250}>
  <Pie
    data={dataWithPercentage}
    dataKey="hours"
    outerRadius={100}
    label={renderCustomizedLabel}
    labelLine={false} // Remove label lines
  >
    {dataWithPercentage?.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={entry.color} // Use the defined color
      />
    ))}
  </Pie>
  <Tooltip formatter={formatTooltip} />
</PieChart>

      )}
    </div>
  );
};

export default ActivityChart;
