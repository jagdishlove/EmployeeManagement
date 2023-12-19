import React from "react";
import { Bar } from "react-chartjs-2";

const MyBarChart = ({ a, b, c, d }) => {
  const data = {
    labels: ["a", "b", "c", "d"],
    datasets: [
      {
        label: "total time",
        data: [a, b, c, d],
        backgroundColor: ["red", "green", "blue", "yellow"],
        borderColor: ["red", "green", "blue", "yellow"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;
