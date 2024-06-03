import React from "react";
import { DialogContentText } from "@mui/material";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#666">
        {`${payload.value}`} {/* Displaying values in percentage */}
      </text>
    </g>
  );
};

const BarChartComponent = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );


  const data = [
    {
      name: "Actual Implementation Cost",
      value: dashboardProjectdetails.actualImplementationCostInPercentage,
      originalValue:
        dashboardProjectdetails?.actualImplementationCost?.toFixed(2), // Store original value
      fill: "#81C84B",
    },
    {
      name: "Projected Implementation Cost",
      value:dashboardProjectdetails?.projectedImplementationCostInPercentage,
      originalValue:
        (dashboardProjectdetails?.projectedImplementationCost || 0).toFixed(2), // Store original value
      fill: "#20D7FE",
    },
    {
      name: "Budget",
      value: dashboardProjectdetails?.projectBudgetInPercentage,

      originalValue: dashboardProjectdetails?.projectBudget || 0, // Store original value
      fill: "#33A1EC",
    },
    {
      name: "Time",
      value: dashboardProjectdetails?.timeInPercentage,

      originalValue: dashboardProjectdetails?.time || 0, // Store original value
      fill: "#FFA07A",
    },
];


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const originalValue = data.value === 0 ? 0 : data.originalValue; // Handling the case where value is 0
      return (
        <div style={{ backgroundColor: "#fff", padding: "5px" }}>
          <p>{`${data.name}: ${originalValue}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DialogContentText>
      <BarChart width={350} height={360} data={data} style={{maxWidth:"90%"}}>
        <XAxis
          dataKey="none"
          label={{
            value: dashboardProjectdetails?.projectName,
            angle: 360,
            position: "insideBottomMiddle",
             style: { fontWeight: "bold", color:"black" }
          }}
        />
        <YAxis
          tick={<CustomizedYAxisTick />}
          label={{
            value: "Progress in %",
            angle: -90,
            position: "insideRight",
            offset: 55,
            style: { fontWeight: "bold", color:"black" }
          }}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="value" />
      </BarChart>
    </DialogContentText>
  );
};

export default BarChartComponent;
