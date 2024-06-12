import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const ProjectPerfomanceData = useSelector(
    (state) => state?.persistData?.workSpace?.projectperformance?.legendList
  );
  const colors = ["#00C49F", "#0088FE", "#FFBB28", "#FFC1CB"];

  useEffect(() => {
    if (ProjectPerfomanceData && ProjectPerfomanceData.length > 0) {
      const data = ProjectPerfomanceData.map((item) => ({
        name: item.project.projectName,
        Breaks:
          item.legendDto.find((legend) => legend.name === "BREAKS")?.value || 0,
        Tasks:
          item.legendDto.find((legend) => legend.name === "TASKS")?.value || 0,
        Meetings:
          item.legendDto.find((legend) => legend.name === "MEETINGS/CALLS")
            ?.value || 0,
        Others:
          item.legendDto.find((legend) => legend.name === "OTHERS")?.value || 0,
      }));

      data.sort((a, b) => {
        const sumA = a.Breaks + a.Tasks + a.Meetings + a.Others;
        const sumB = b.Breaks + b.Tasks + b.Meetings + b.Others;
        return sumB - sumA; // Sort in ascending order
      });

      setChartData(data);
    }
  }, [ProjectPerfomanceData]);

 const calculateChartHeight = () => {
  const itemCount = chartData.length;
  const baseHeight = 100;
  const heightPerItem = 30;
  const minHeight = 200; 
  
  let calculatedHeight = baseHeight + itemCount * heightPerItem;
  if (calculatedHeight < minHeight && chartData.length === 1) {
    calculatedHeight = minHeight;
  }
  
  return calculatedHeight;
};


  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              color: "black",
              marginBottom: "10px",
              paddingLeft: "25px",
              position: "relative",
              marginLeft: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: colors[index],
                marginRight: "10px",
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  if (!ProjectPerfomanceData || ProjectPerfomanceData.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No data available
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold"></Typography>
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer
          width="100%"
          height={calculateChartHeight()}
          style={{
            cursor: "default",
            width: "100%",
            height: "auto",
            maxHeight: "350px", // Add a maximum height if necessary
          }}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, left: 60, bottom: 5 }}
            bottomAxis={null}
            barCategoryGap={50}
          >
            <XAxis type="number" tick={null} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ width: 200, fontSize: 13, fontWeight: "bold", fill: "black"  }}
              tickFormatter={(value) => {
                if (value.length > 10) {
                  return value.slice(0, 10) + "...";
                }
                return value;
              }}
            />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend
              content={renderLegend}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
            <Bar dataKey="Breaks" stackId="a" fill="#00C49F" barSize={21} />
            <Bar dataKey="Tasks" stackId="a" fill="#0088FE" barSize={21} />
            <Bar dataKey="Meetings" stackId="a" fill="#FFBB28" barSize={21} />
            <Bar dataKey="Others" stackId="a" fill="#FFC1CB" barSize={21} />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};
export default SimpleBarChart;
