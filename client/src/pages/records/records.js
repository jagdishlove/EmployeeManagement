import React, { useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Chart from "../../components/history/Chart";
import HistoryCalendar from "../../components/history/calendar/calendar";
import TimesheetReadOnly from "../timesheet/timesheetReadOnly";
import { useState } from "react";
import moment from "moment";
import { Typography, Tabs, Tab } from "@mui/material";

import { useNavigate } from "react-router-dom";
import "./Records.css";
import { useDispatch } from "react-redux";
import { historyDataActionCreator } from "../../redux/actions/historyData/historyDataAction";

// import Rechart from "../../components/history/Consistency Meter/reChart";

const Records = () => {
  const [showHistoryTimesheet, setShowHistoryTimesheet] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const dispatch = useDispatch();

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

  const handleYearChange = (e) => {
    handleYearMonth(e);
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    getHistoryData(value, selectedYear);

    setSelectedMonth(parseInt(value));
  };

  useEffect(() => {
    console.log("selectedYear", selectedYear);
    const e = {
      target: {
        value: selectedYear
          ? selectedYear.toString()
          : moment().year().toString(),
      },
    };
    handleYearMonth(e, true);
  }, []);

  const changeMonthAccordingly = () => {
    const currentYear = moment().year();
    const yearList = [];

    if (selectedMonth < 12) {
      yearList.push(currentYear - 1, currentYear);
    } else {
      yearList.push(currentYear);
    }

    setYears(yearList);

    const monthList = [];
    const currentMonth = moment().month();
    let startMonth;
    let endMonth;

    if (currentMonth < 11) {
      // If current month is before December, include months from the current month to December of the previous year
      startMonth = 0; // Start from the current month
      endMonth = currentMonth; // December
    } else {
      // If current month is December, include months from January to the current month of the current year
      startMonth = currentMonth; // January
      endMonth = 11; // Current month
    }

    for (let month = startMonth; month <= endMonth; month++) {
      const date = moment().year(selectedYear).month(month).startOf("month");
      monthList.push({
        value: month,
        label: date.format("MMMM"),
      });
    }

    setMonths(monthList);
  };

  const getHistoryData = (month, year) => {
    const paramas = {
      month: parseInt(month) + 1,
      year: year,
    };
    dispatch(historyDataActionCreator(paramas));
  };

  useEffect(() => {
    getHistoryData(selectedMonth, selectedYear);
    changeMonthAccordingly();
  }, []);

  const handleYearMonth = (e) => {
    const { value } = e.target;

    setSelectedYear(value);
    if (e.target.value !== moment().year().toString()) {
      const monthList = [];
      const currentMonth = moment().month();
      let startMonth;
      let endMonth;

      // If current month is December, include months from January to the current month of the current year
      startMonth = currentMonth + 1; // January
      endMonth = 12; // Current month

      for (let month = startMonth; month < endMonth; month++) {
        const date = moment().year(selectedYear).month(month).startOf("month");
        monthList.push({
          value: month,
          label: date.format("MMMM"),
        });
      }
      setMonths(monthList);
      setSelectedMonth(monthList[0].value);
      getHistoryData(startMonth, value);
    } else {
      const monthList = [];
      const currentMonth = moment().month();
      let startMonth;
      let endMonth;

      // If current month is December, include months from January to the current month of the current year
      startMonth = 0; // January
      endMonth = currentMonth; // Current month

      getHistoryData(endMonth, value);

      for (let month = startMonth; month <= endMonth; month++) {
        const date = moment().year(selectedYear).month(month).startOf("month");
        monthList.push({
          value: month,
          label: date.format("MMMM"),
        });
      }
      setMonths(monthList);
      setSelectedMonth(currentMonth);
    }
  };
  return (
    <>
      <Typography
        style={{
          fontSize: "24px",
          fontFamily: "Nunito sans",
          fontWeight: "bold",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
        variant="h4"
        align="center"
        mt={2}
      >
        TIMESHEET
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="tablist"
        TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator
      >
        <Tab
          label="Current"
          className="currentTab"
          style={{
            width: "100px",
            border: "2px solid #008080",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
          TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator
          selected={value === 0}
        />
        <Tab
          label="History"
          className="HistoryTab"
          style={{
            backgroundColor: "#008080",
            width: "100px",
            color: "white",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
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
            setYears={setYears}
            changeMonthAccordingly={changeMonthAccordingly}
            handleYearMonth={handleYearMonth}
            months={months}
            handleYearChange={handleYearChange}
            years={years}
            handleMonthChange={handleMonthChange}
          />
          <Chart />
          {/* <Rechart/>  */}
        </>
      )}
    </>
  );
};

export default Records;
