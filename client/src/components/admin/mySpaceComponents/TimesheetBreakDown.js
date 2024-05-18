import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const TimesheetBreakDown = ({ approver }) => {
  let data;

  if (approver) {
    // If approver is true, fetch workSpaceData
    const workSpaceData = useSelector(
      (state) => state?.persistData?.workSpace?.workSpaceData?.legendList
    );

    // You can now use workSpaceData for further processing or rendering
    data = workSpaceData;
  } else {
    // If approver is false, fetch ratingData
    const ratingData = useSelector(
      (state) => state?.persistData?.workSpace?.ratingData?.legendList
    );

    // You can use ratingData here or assign it to data
    data = ratingData;
  }

  // Filter out data points with a value of 0
  const filteredData = data?.filter((entry) => entry.value > 0);

  // Calculate the total number of hours
  const totalHours = filteredData?.reduce((sum, entry) => sum + entry.value, 0);

  const colorPalette = {
    TASKS: "#0088FE",
    MEETINGS: "#FFBB28",
    BREAKS: "#00C49F",
    OTHERS: "#FFC0CB",
    "MEETINGS/CALLS": "#FFBB28",
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
        position: "relative",
      }}
    >
      {filteredData?.length === 0 ? (
         <div
         style={{
           position: "absolute",
           marginTop: "25%",
           marginLeft: "15%",
           transform: "translate(-50%, -50%)",
           textAlign: "center",
         }}
       >
         <Typography>No data available</Typography>
       </div>
      ) : (
        <PieChart width={400} height={320}>
          <Pie
            data={dataWithPercentage}
            dataKey="hours"
            outerRadius={140}
            innerRadius={67}
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

export default TimesheetBreakDown;
