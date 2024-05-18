import React from "react";

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

function ProjectProgressLineChart() {
  const projectProgressGraphData = useSelector(
    (state) => state?.persistData?.workSpace?.projectProgressGraphData
  );


  
  const formatTooltipValue = (value) => {
    // Check if value is undefined or null or not a number
    if (value === undefined || value === null || isNaN(value)) {
      return "0.00 ";
    }

    // If value is a valid number, apply the toFixed(2) method
    // Use Number() to ensure value is treated as a number
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      return `${numericValue.toFixed(2)}`;
    } else {
      return "0.00";
    }
  }
  ;
  
  return (
    <>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={projectProgressGraphData}
          margin={{
            right: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />

          <YAxis
            tick={null}
            label={{
              value: "Cost ",
              angle: -90,
              position: "insideRight",
              offset: 40,
              style: { fontWeight: "bold", color:"black" }
            }}
          />
          <Tooltip formatter={formatTooltipValue} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="projectedImplementationCost"
            stroke="#60C0A3"
            activeDot={{ r: 8 }}
            name="Projected Implementation"
          />
          <Line
            type="monotone"
            dataKey="actualImplementationCost"
            stroke="#C06060"
            activeDot={{ r: 8 }}
            name="Actual Implementation"
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>Time</div>
    </>
  );
}

export default ProjectProgressLineChart;
