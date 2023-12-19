import React from "react";
import { Bar, BarChart,Tooltip } from "recharts";

const data = [
  {
    uv: 4000,
    pv: 2400,
    uvu: 1200,
    uvy: 1000,
  },
];

const Rechart = () => {
  return (
    <BarChart
      width={150}
      height={60}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Tooltip /> {/* This adds the tooltip to the chart. */}
      <Bar dataKey="pv" fill="#4285F4" stroke="#4285F4" strokeWidth={2} />
      <Bar dataKey="uv" fill="#FFA50080" stroke="#FBBC04" strokeWidth={2} />
      <Bar dataKey="uvu" fill="#34A85380" stroke="#34A853" strokeWidth={2} />
      <Bar dataKey="uvy" fill="#FFC0CB80" stroke="#FFC0CB" strokeWidth={2} />
    </BarChart>
  );
};

export default Rechart;
