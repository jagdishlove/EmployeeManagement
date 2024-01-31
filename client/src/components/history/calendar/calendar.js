import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheetEntryAction } from "../../../redux/actions/timeSheet/timeSheetAction";
import VerticalBarGraph from "../VerticalBarGraph";
import "./calenderStyle.css";

const HistoryCalendar = ({
  setShowHistoryTimesheet,
  selectedMonth,
  selectedYear,
  handleMonthChange,
  months,
  handleYearChange,
  years,
}) => {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();

  const monthRef = useRef(null);

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

  const getDataType = (event) => {
    return transformedData.find((data) => data.type === event).type;
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
      "CLIENTHOLIDAY",
      "UNKNOWN",
    ];

    // Check if the event type is "WEEKEND" and all event data is 0
    if (
      event.type === "WEEKEND" &&
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
            fontSize: "12px",
          }}
        >
          {event.type === "HOLIDAY" ? (
            <Box display={"flex"} flexDirection={"column"}>
              <div>Holiday</div>
              {event.dayTypeDescription && (
                <div>{event.dayTypeDescription}</div>
              )}
            </Box>
          ) : event.type === getDataType(event.type) ? (
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
                ref={monthRef}
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
