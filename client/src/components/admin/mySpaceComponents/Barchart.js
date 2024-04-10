import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SimpleBarChart = () => {
  
  
  const ProjectPerfomanceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.projectperformance?.legendList
  );
  console.log("project performance..", ProjectPerfomanceData);
  
  const data = [
    { name: 'Kairos', Breaks: 30, Tasks: 50, Meetings: 20, Others: 10 },
    { name: 'FDX', Breaks: 40, Tasks: 35, Meetings: 15, Others: 10 },
    { name: 'SalesShark', Breaks: 20, Tasks: 45, Meetings: 25, Others: 10 },
    { name: 'Continew', Breaks: 15, Tasks: 40, Meetings: 20, Others: 25 },
  ];
  
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>{entry.value}</li>
        ))}
      </ul>
    );
  };
  
  // Function to normalize data so that the sum of Breaks, Tasks, Meetings, and Others equals 100 for each entry
  const normalizeData = (data) => {
    return data.map(entry => {
      const total = entry.Breaks + entry.Tasks + entry.Meetings + entry.Others;
      return {
        ...entry,
        Breaks: (entry.Breaks / total) * 100,
        Tasks: (entry.Tasks / total) * 100,
        Meetings: (entry.Meetings / total) * 100,
        Others: (entry.Others / total) * 100,
      };
    });
  }; 
  const normalizedData = normalizeData(data);
  return (
    <ResponsiveContainer
      width="80%"
      height={200}
      style={{
        cursor: 'default',
        width: '100%',
        height: '80%',
        maxHeight: '170px',
        maxWidth: '479px',
      }}
    >
      <BarChart data={normalizedData} layout="vertical" margin={{ top: 20, right: 25, left: 20, bottom: 5 }} bottomAxis={null}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend content={renderLegend} layout="vertical" align="right" verticalAlign="middle" margin={{ left: 20, right: 20 }}  />
        <Bar dataKey="Breaks" stackId="a" fill="#82ca9d" barSize={30} />
        <Bar dataKey="Tasks" stackId="a" fill="#8884d8" barSize={30} />
        <Bar dataKey="Meetings" stackId="a" fill="#ffc658" barSize={30} />
        <Bar dataKey="Others" stackId="a" fill="#FFC1CB" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
