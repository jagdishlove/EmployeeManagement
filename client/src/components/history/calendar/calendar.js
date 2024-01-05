import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { historyDataActionCreator } from "../../../redux/actions/historyData/historyDataAction";
import { getTimesheetEntryAction } from "../../../redux/actions/timeSheet/timeSheetAction";
import VerticalBarGraph from "../VerticalBarGraph";
import "./calenderStyle.css";

const HistoryCalendar = ({
  setShowHistoryTimesheet,
  setSelectedMonth,
  selectedMonth,
  setSelectedYear,
  selectedYear,
}) => {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const customDayNames = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const historyData = useSelector(
    (state) => state?.nonPersist?.historyData.historyData
  );

  const transformedData = historyData?.timesheetUtilizationEntryList?.map(
    (item) => {
      const date = new Date(item.date);

      const newObj = {
        Date: date,
        type: item.dayType,
        dayTypeDescription: item.dayTypeDescription,
        tasks: 0,
        meetings: 0,
        breaks: 0,
        others: 0,
      };

      if (item.legendList) {
        item.legendList.forEach((legendItem) => {
          const propertyName = legendItem.name.toLowerCase();
          const valueInHours = Math.floor(legendItem.value / 60); // Whole hours
          const remainderMinutes = legendItem.value % 60; // Remaining minutes
          newObj[propertyName] = `${valueInHours}.${String(
            remainderMinutes
          ).padStart(2, "0")}`;
        });
      }

      return newObj;
    }
  );

  const getHistoryData = (month, year) => {
    const paramas = {
      month: parseInt(month) + 1,
      year: year,
    };
    dispatch(historyDataActionCreator(paramas));
  };

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

  useEffect(() => {
    getHistoryData(selectedMonth, selectedYear);
    changeMonthAccordingly();
  }, []);

  const handleYearChange = (e) => {
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

  const handleMonthChange = (e) => {
    const { value } = e.target;
    getHistoryData(value, selectedYear);

    setSelectedMonth(value);
  };

  const eventRenderer = ({ event }) => {
    const DATETYPES = [
      "LEAVE",
      "SICKLEAVE",
      "LEAVEWITHOUTPAY",
      "HOLIDAY",
      "OPTIONALHOLIDAY",
      "HALFDAYLEAVE",
      "HALFDAYSICKLEAVE",
      "COMPENSATORYLEAVE",
      "HALFDAYCOMPENSATORYLEAVE",
      "CASUALLEAVE",
      "PATERNITYLEAVE",
      "SABBATICALLEAVE",
      "MATERNITYLEAVE",
      "ADOPTIONLEAVE",
      "MATERNITYILLNESSLEAVE",
      "HALFDAYCASUALLEAVE",
      "HALFDAYLEAVEWITHOUTPAY",
      "UNKNOWN",
    ];

    // Check if the event type is "WEEKEND" and all event data is 0
    if (
      (event.type === "WEEKEND" ||
        event.type === "HALFDAYLEAVE" ||
        event.type === "HALFDAYSICKLEAVE") &&
      event.tasks === 0 &&
      event.meetings === 0 &&
      event.breaks === 0 &&
      event.others === 0
    ) {
      return (
        <Typography
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100px",
            width: "100%",
            textAlign: "center",
            whiteSpace: "normal",
            wordWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          {event.type === "WEEKEND"
            ? "Weekend"
            : event.type === "HALFDAYLEAVE"
            ? "Half Day Leave"
            : "Half Day Sick Leave"}
        </Typography>
      );
    }

    // Check if the event type is in DATETYPES
    if (DATETYPES.includes(event.type)) {
      return (
        <Typography
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100px",
            width: "100%",
            textAlign: "center",
            wordWrap: "wrap",
            whiteSpace: "break-spaces",
          }}
        >
          {event.type === "HOLIDAY" ? (
            <Box display={"flex"} flexDirection={"column"}>
              <div>Holiday</div>
              {event.dayTypeDescription && (
                <div>{event.dayTypeDescription}</div>
              )}
            </Box>
          ) : event.type === "LEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "SICKLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "OPTIONALHOLIDAY" ? (
            event.dayTypeDescription 
          ) : event.type === "LEAVEWITHOUTPAY" ? (
            event.dayTypeDescription 
          ) : event.type === "HALFDAYLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "HALFDAYSICKLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "COMPENSATORYLEAVE" ? (
            event.dayTypeDescription
          ) : event.type === "HALFDAYCOMPENSATORYLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "CASUALLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "PATERNITYLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "SABBATICALLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "MATERNITYLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "ADOPTIONLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "MATERNITYILLNESSLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "HALFDAYCASUALLEAVE" ? (
            event.dayTypeDescription 
          ) : event.type === "HALFDAYLEAVEWITHOUTPAY" ? (
            event.dayTypeDescription 
          )  : event.type === "HALFDAYSICKLEAVE" && "LEAVE" ? (
            event.dayTypeDescription 
          ) : (
            "UNKNOWN"
          )}
        </Typography>
      );
    }

    // Render the graph if none of the conditions are met
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1%",
        }}
      >
        <Box sx={{ marginInline: "-1.5rem" }}>
          <VerticalBarGraph
            value={event.tasks}
            color=" #4285F4"
            border="#4285F4"
          />
        </Box>
        <Box sx={{ marginInline: "-1.5rem" }}>
          <VerticalBarGraph
            value={event.meetings}
            color="#FFA50080"
            border="#FBBC04"
          />
        </Box>
        <Box sx={{ marginInline: "-1.5rem" }}>
          <VerticalBarGraph
            value={event.breaks}
            color="#34A85380"
            border="#34A853"
          />
        </Box>
        <Box sx={{ marginInline: "-1.5rem" }}>
          <VerticalBarGraph
            value={event.others}
            color="#FFC0CB80"
            border="#FFC0CB"
          />
        </Box>
      </Box>
    );
  };

  const eventStyleGetter = () => {
    // Customize the event styling here
    const style = {
      height: "100%",
      // marginTop: "-1.4rem",
      background: "transparent",
    };

    return {
      style,
    };
  };

  const handleEventClick = (data) => {
    setShowHistoryTimesheet(true);
    const date = new Date(data.Date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    dispatch(getTimesheetEntryAction(formattedDate));
  };

  return (
    <Box>
      <Grid Container>
        <div className="calendar-container">
          <div
            style={{
              padding: "10px",
              borderBottom: "4px solid #008080",
              marginBottom: "20px",
            }}
          >
            <div
              className="dropdowns"
              style={{
                display: "block",
                justifyContent: "space-between",
                width: "300px",
              }}
            >
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                style={{
                  flex: "1",
                  padding: " 10px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  fontSize: " 16px",
                  outline: " none",
                  fontWeight: "bolder",
                }}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                style={{
                  flex: "1",
                  padding: " 10px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  fontSize: " 16px",
                  outline: " none",
                  fontWeight: "bolder",
                }}
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Box>
            <Calendar
              localizer={localizer}
              events={transformedData}
              views={["month"]}
              startAccessor="Date"
              endAccessor="Date"
              dayLayoutAlgorithm="no-overlap"
              eventPropGetter={eventStyleGetter}
              eventStyleGetter={eventStyleGetter}
              style={{ height: "80vh" }}
              components={{
                event: eventRenderer,
              }}
              date={new Date(selectedYear, selectedMonth, 1)}
              onSelectEvent={handleEventClick}
              // defaultDate={new Date(selectedYear, selectedMonth, 1)}
              formats={{
                weekdayFormat: (date) => {
                  const dayOfWeek = date.getDay();
                  return customDayNames[dayOfWeek];
                },
              }}
            />
          </Box>
        </div>
      </Grid>
    </Box>
  );
};

export default HistoryCalendar;
