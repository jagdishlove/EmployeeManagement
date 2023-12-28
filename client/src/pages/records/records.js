import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Chart from "../../components/history/Chart";
import HistoryCalendar from "../../components/history/calendar/calendar";
import TimesheetReadOnly from "../timesheet/timesheetReadOnly";
import { useState } from "react";
import moment from "moment";
import { Typography, Tabs, Tab } from "@mui/material";

import { useNavigate } from "react-router-dom";
import './Records.css'


// import Rechart from "../../components/history/Consistency Meter/reChart";

const Records = () => {
  const [showHistoryTimesheet, setShowHistoryTimesheet] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const navigate = useNavigate();
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if (newValue === 0) {
        navigate("/timesheet");
      } else if (newValue === 1) {
        navigate("/history");
      }
    };
  return (
    <>
      <Typography
        style={{
          fontSize: '24px', 
          fontFamily: 'Nunito sans', 
          fontWeight: 'bold', 
          marginBottom: '10px', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
        }}
        variant="h4"
        align="center"
        mt={2}
      >        
      TIMESHEET
      </Typography>
      <div style={{ width: "100%", margin: "auto", marginBottom: "18px",border:'1px solid #008080' }} />

      <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      className="tablist" 
      TabIndicatorProps={{ style: { display: 'none' } }} // Hide the indicator


    >
      <Tab
        label="Current"
        className="currentTab" 
        style={{
          width: '20%',
          border: '2px solid #008080',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius:'10px'

        }}
        TabIndicatorProps={{ style: { display: 'none' } }} // Hide the indicator

        selected={value === 0} 
      />
      <Tab
        label="History"
        className="HistoryTab" 
        style={{
          backgroundColor:'#008080',
          width:'20%',
          color:'white',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius:'10px'
        }}
        selected={value === 1} 
      />
    </Tabs>
      {showHistoryTimesheet ? (
        <TimesheetReadOnly setShowHistoryTimesheet={setShowHistoryTimesheet} />
      ) : (
        <>
          <HistoryCalendar
            setShowHistoryTimesheet={setShowHistoryTimesheet}
            setSelectedMonth={setSelectedMonth}
            selectedMonth={selectedMonth}
            setSelectedYear={setSelectedYear}
            selectedYear={selectedYear}
          />
          <Chart />
          {/* <Rechart/>  */}
        </>
      )}
    </>
  );
};

export default Records;
