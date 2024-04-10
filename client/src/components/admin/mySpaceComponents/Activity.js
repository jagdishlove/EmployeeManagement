import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Stack, IconButton } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
  TimelineConnector,
} from "@mui/lab";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Activity from "../../../assets/Activity.svg";
import Dropdown from "../../../components/forms/dropdown/dropdown";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import { getMySpaceActivityAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";

const ITEMS_PER_PAGE = 3;

const CustomBorderComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedValue, setSelectedValue] = useState("TIMESHEET");
  const theme = useTheme();
  const dispatch = useDispatch();
  const style = TimesheetStyle(theme);

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(timelineData.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const otherActivityData = useSelector(
    (state) => state?.nonPersist?.workSpace?.myspaceActivity?.content
  );
  console.log("otherActivityData", otherActivityData);

  useEffect(() => {
    dispatch(masterDataAction());
    dispatch(getMySpaceActivityAction(selectedValue));
  }, [selectedValue, dispatch]);

  const otherActivityList = useSelector(
    (state) => state.persistData.masterData?.dashBoardActivity
  );

  const timelineData = [
    {
      activityType: "LEAVES",
      events: [
        {
          date: "2024-04-03T03:25:38.913+00:00",
          time: "08:00:00",
          leaveType: "LOP",
          status: "Approved",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
        {
          date: "2024-04-03T03:25:38.913+00:00",
          time: "09:00:00",
          leaveType: "Privilege Leave",
          status: "Submitted",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Mani",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
        {
          date: "2024-04-03T03:25:38.913+00:00",
          time: "09:00:00",
          leaveType: "Casual Leave",
          status: "Rejected",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Amit",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
      ],
    },
    {
      activityType: "TIMESHEET",
      events: [
        {
          date: "2024-04-02T03:25:38.913+00:00",
          time: "04:00:00",
          leaveType: "LOP",
          status: "Approved",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
        {
          date: "2024-04-03T03:25:38.913+00:00",
          time: "05:00:00",
          leaveType: "Privilege Leave",
          status: "Submitted",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Mani",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
        {
          date: "2024-04-04T03:25:38.913+00:00",
          time: "06:00:00",
          leaveType: "Casual Leave",
          status: "Rejected",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Amit",
          projectTask: "Kairos Task",
          ProjectName: "Kairos",
        },
      ],
    },
  ];

  // const currentPageData = timelineData
  //   .filter((entry) => entry.activityType === selectedValue)
  //   .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  // Function to convert time from 24-hour format to 12-hour format
  const convertTimeTo12HourFormat = (timeString) => {
    // Parse the time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(":").map(Number);

    // Determine if it's AM or PM
    const period = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    const twelveHour = hours % 12 || 12;

    // Return formatted time string
    return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Store the dates already displayed
  const displayedDates = {};
  return (
    <>
      <Grid item xs={6} ml={5} mt={5} display="flex" alignItems="center">
        <img src={Activity} alt="activity icon" />
        <Typography margin={2}> Activity </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        mt={-5}
        mr={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
            {currentPage + 1} of{" "}
            {Math.ceil(
              timelineData.filter(
                (entry) => entry.activityType === selectedValue
              ).length / ITEMS_PER_PAGE
            )}{" "}
            Pages
          </Typography>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            disabled={
              currentPage >=
              Math.ceil(
                timelineData.filter(
                  (entry) => entry.activityType === selectedValue
                ).length / ITEMS_PER_PAGE
              ) -
                1
            }
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Stack>
      </Grid>

      <Grid container mt={5} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Dropdown
            value={selectedValue}
            onChange={handleDropdownChange}
            dropdownName="otherActivityList"
            options={otherActivityList}
            style={{
              ...style.TimesheetTextField,
              border: "1px solid silver",
              width: "40%",
              marginRight: "5%",
              marginTop: "-5px",
              marginLeft: "30%",
              borderRadius: "5px",
            }}
            valueKey="name"
            labelKey="value"
            name="otherActivityList"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <Timeline>
            {timelineData.map((entry, index) => (
              <React.Fragment key={index}>
                {/* Filter events for the selected activity type */}
                {entry.activityType === selectedValue &&
                  entry.events.map((event, eventIndex) => (
                    <TimelineItem key={`${index}-${eventIndex}`}>
                      {/* Display date only once for each group of events with the same date */}
                      {(eventIndex === 0 || // Display the date for the first event
                        event.date !== entry.events[eventIndex - 1].date || // Display the date if the date changes
                        entry.events.filter((e) => e.date === event.date)
                          .length > 1) && ( // Display the date if there are multiple events on the same date
                        <TimelineOppositeContent
                          color="textSecondary"
                          sx={{ maxWidth: "11%" }}
                        >
                           {!displayedDates[event.date] && (
                            <>
                              {new Date(event.date).toLocaleDateString(
                                undefined,
                                {
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                              {displayedDates[event.date] = true}
                            </>
                          )}
                        </TimelineOppositeContent>
                      )}
                      <TimelineSeparator>
                        <TimelineDot />
                        {eventIndex < entry.events.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>{convertTimeTo12HourFormat(event.time)}</div>
                          <div
                            style={{
                              border: "1px dotted #ccc",
                              flex: 1,
                              marginLeft: "16px",
                              padding: "10px 20px",
                              margin: "15px 20px",
                              maxWidth: "89%",
                              wordWrap: "break-word",
                            }}
                          >
                            {selectedValue === "LEAVES" &&
                              entry.activityType === "LEAVES" && (
                                <>
                                  {event.status === "Submitted" && (
                                    <>
                                      You submitted {event.leaveType} from{" "}
                                      {event.fromDate} to {event.toDate} to{" "}
                                      {event.managerName}
                                    </>
                                  )}
                                  {event.status === "Approved" && (
                                    <>
                                      Your submitted {event.leaveType} from{" "}
                                      {event.fromDate} to {event.toDate} has
                                      been approved by {event.managerName}.
                                    </>
                                  )}
                                  {event.status === "Rejected" && (
                                    <>
                                      Your timesheet {event.fromDate}{" "}
                                      {event.startTime} to {event.endTime}{" "}
                                      rejected by {event.managerName}.
                                    </>
                                  )}
                                </>
                              )}
                            {selectedValue === "TIMESHEET" &&
                              entry.activityType === "TIMESHEET" && (
                                <>
                                  {event.status === "Submitted" && (
                                    <>
                                      You {event.status} a timesheet for{" "}
                                      {event.fromDate} {event.startTime} to{" "}
                                      {event.endTime} engaged in{" "}
                                      {event.projectTask}
                                    </>
                                  )}
                                  {event.status === "Approved" && (
                                    <>
                                      {event.managerName} has {event.status}{" "}
                                      Your timesheet for {event.fromDate}{" "}
                                      {event.startDate} to {event.endTime}{" "}
                                      engaged in {event.projectTask}
                                    </>
                                  )}
                                  {event.status === "Rejected" && (
                                    <>
                                      {event.managerName} has {event.status}{" "}
                                      Your timesheet for {event.fromDate}{" "}
                                      {event.startDate} to {event.endTime}
                                      engaged in {event.projectTask}
                                    </>
                                  )}
                                </>
                              )}

                            {selectedValue === "OTHER_ACTIVITIES" &&
                              entry.activityType === "OTHER_ACTIVITIES" && (
                                <>
                                  {event.status === "Submitted" && (
                                    <>
                                      You {event.status} a timesheet for{" "}
                                      {event.fromDate} {event.startTime} to{" "}
                                      {event.endTime} engaged in{" "}
                                      {event.projectTask}
                                    </>
                                  )}
                                  {event.status === "Approved" && (
                                    <>
                                      {event.managerName} has {event.status}{" "}
                                      Your timesheet for {event.fromDate}{" "}
                                      {event.startTime} to {event.endTime}
                                      engaged in {event.projectTask}
                                    </>
                                  )}
                                  {event.status === "Rejected" && (
                                    <>
                                      Your timesheet for {event.fromDate}{" "}
                                      {event.startDate} to {event.endTime}{" "}
                                      {event.projectTask} {event.status} by{" "}
                                      {event.managerName}
                                    </>
                                  )}
                                </>
                              )}
                          </div>
                        </div>
                        {/* Render TimelineConnector if there are more events */}
                        {eventIndex < entry.events.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </React.Fragment>
            ))}
          </Timeline>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomBorderComponent;
