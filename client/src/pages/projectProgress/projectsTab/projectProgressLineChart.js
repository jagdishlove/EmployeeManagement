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
    (state) => state?.nonPersist?.workSpace?.projectProgressGraphData
  );

  // Function to calculate tick values based on selected option

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
              value: "Cost (%)",
              angle: -90,
              position: "insideRight",
              offset: 40,
            }}
          />
          <Tooltip />
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
