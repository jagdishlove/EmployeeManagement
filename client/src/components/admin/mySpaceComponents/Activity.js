import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineOppositeContent, TimelineConnector } from "@mui/lab";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Stack, IconButton, CircularProgress } from "@mui/material";
import Activity from "../../../assets/Activity.svg";
import Dropdown from "../../../components/forms/dropdown/dropdown";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import { getMySpaceActivityAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { useTheme } from "@mui/material/styles";
import { TimesheetStyle } from "../../../pages/timesheet/timesheetStyle";

const CustomBorderComponent = ({ selectedMonth, selectedYear }) => {
  const [selectedValue, setSelectedValue] = useState("TIMESHEET");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const style = TimesheetStyle(theme);

  const otherActivityData = useSelector((state) => state?.persistData?.workSpace?.myspaceActivity);
  const totalPages = otherActivityData[0]?.events?.totalPages;

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    setCurrentPage(0);
  };

  const otherActivityList = useSelector((state) => state.persistData?.loginDetails?.masterData?.dashBoardActivity);

  const params = {
    dashboardActivity: selectedValue,
    page: currentPage,
    size: 10,
    month: selectedMonth + 1,
    year: selectedYear,
  };

  useEffect(() => {
    setLoading(true);
    dispatch(masterDataAction());
    dispatch(getMySpaceActivityAction(params)).finally(() => setLoading(false));
  }, [selectedValue, dispatch, currentPage, selectedMonth, selectedYear]);

  const timelineData = [otherActivityData];

  const convertTimeTo12HourFormat = (timeString) => {
    // Check if timeString is defined and not null
    if (timeString) {
      // Parse the time string into hours and minutes
      const [hours, minutes] = timeString.split(":").map(Number);

      // Determine if it's AM or PM
      const period = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      const twelveHour = hours % 12 || 12;

      // Return formatted time string
      return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    } else {
      // Return an empty string or handle the case when timeString is undefined
      return ""; // Or return some default value
    }
  };

  // Store the dates already displayed
  const displayedDates = {};
  return (
    <>
      {loading && (
        <Grid container justifyContent="center" mt={5}>
          <CircularProgress />
        </Grid>
      )}

      <Grid container spacing={3} mb={2} mt={1}>
        <Grid item xs={6} display={"flex"} ml={5} flexDirection={"row"}>
          <img src={Activity} alt="activity icon" style={{ height: '48px', width: '48px' }} />
          <Typography margin={1} sx={{
            marginLeft: "20px",
            fontWeight: '600',
            lineHeight: '36.4px',
            ['@media (min-width:960px)']: {
              fontSize: '26px',
              lineHeight: '36.4px',
            },
          }}> Activity</Typography>
        </Grid>

        {totalPages > 0 && (
          <Grid item xs={5}>
            {!loading && (
              <Grid container justifyContent="flex-end">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
                    {currentPage + 1} of {totalPages} Pages
                  </Typography>
                  <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
                    <KeyboardArrowLeftOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ChevronRightOutlinedIcon />
                  </IconButton>
                </Stack>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>

      <Grid
        item
        xs={6}
        mt={-5}
        mr={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      ></Grid>

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
            {timelineData[0].map((entry, index) => (
              <React.Fragment key={index}>
                {/* Filter events for the selected activity type */}
                {entry.activityType === selectedValue &&
                  (entry.events?.content.length > 0 ? (
                    entry.events?.content.map((event, eventIndex) => (
                      <TimelineItem key={`${index}-${eventIndex}`}>
                        {/* Display date only once for each group of events with the same date */}
                        {(eventIndex === 0 || // Display the date for the first event
                          event.dateTime.split(" ")[0] !==
                          entry.events?.content[
                            eventIndex - 1
                          ].dateTime.split(" ")[0] || // Display the date if the date changes
                          entry.events?.content.filter(
                            (e) =>
                              e.dateTime.split(" ")[0] ===
                              event.dateTime.split(" ")[0]
                          ).length > 1) && ( // Display the date if there are multiple events on the same date
                            <TimelineOppositeContent
                              color="textSecondary"
                              sx={{ maxWidth: "11%" }}
                            >
                              {!displayedDates[event.dateTime.split(" ")[0]] && (
                                <b>
                                  {new Date(
                                    event.dateTime.split(" ")[0]
                                  ).toLocaleDateString(undefined, {
                                    month: "long",
                                    day: "numeric",
                                  })}
                                  {
                                    (displayedDates[
                                      event.dateTime.split(" ")[0]
                                    ] = true)
                                  }
                                </b>
                              )}
                            </TimelineOppositeContent>
                          )}
                        <TimelineSeparator>
                          <TimelineDot />
                          {eventIndex < entry.events?.content.length - 1 && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div style={{ width: '80px', textAlign: 'right' }}>
                              {convertTimeTo12HourFormat(
                                event.dateTime.split(" ")[1]
                              )}
                            </div>
                            <div
                              style={{
                                border: "1px dotted #ccc",
                                flex: 1,
                                padding: "10px 20px",
                                margin: "15px 20px",
                                maxWidth: "80%",
                              }}
                            >
                              {selectedValue === "LEAVES" &&
                                entry.activityType === "LEAVES" && (
                                  <>
                                    {event.status === "SUBMITTED" && (
                                      <>
                                        You <span style={{ color: "#000" }}>{event.status}</span>{" "}{event.leaveMaster} from{" "}
                                        {event.fromDate} to {event.toDate} , to {" "}
                                        {event.leaveApprover}
                                      </>
                                    )}
                                    {event.status === "APPROVED" && (
                                      <>
                                        Your submitted {event.leaveMaster} from{" "}
                                        {event.fromDate} to {event.toDate} has
                                        been <span style={{ color: "#0A865A" }}>{event.status}</span>{" "} by {event.leaveApprover}.
                                      </>
                                    )}
                                    {event.status === "REJECTED" && (
                                      <>
                                        Your submitted {event.leaveMaster} from{" "}
                                        {event.fromDate} to {event.toDate} has
                                        been    {" "}
                                        <span style={{ color: "#FA7A7A" }}>{event.status}</span>{" "} by {event.leaveApprover}.
                                      </>
                                    )}
                                  </>
                                )}
                              {selectedValue === "TIMESHEET" &&
                                entry.activityType === "TIMESHEET" && (
                                  <>
                                    {event.status === "SUBMITTED" && (
                                      <>
                                        You <span style={{ color: "#000" }}>{event.status}</span>{" "}a timesheet for{" "}
                                        {event.fromDate} ,{convertTimeTo12HourFormat(event.startTime)} to{" "}
                                        {convertTimeTo12HourFormat(event.endTime)} engaged in{" "}
                                        {event.project}
                                      </>
                                    )}
                                    {event.status === "APPROVED" && (
                                      <>
                                        {event.timesheetApproval} has{" "}
                                        <span style={{ color: "#0A865A" }}>{event.status}</span>{" "}Your timesheet for{" "}
                                        {event.timeSheetDate}, {convertTimeTo12HourFormat(event.startTime)}{" "}
                                        to {convertTimeTo12HourFormat(event.endTime)} engaged in{" "}
                                        {event.project} {event.activity}
                                      </>
                                    )}
                                    {event.status === "REJECTED" && (
                                      <>
                                        {event.timesheetApproval} has{" "}
                                        <span style={{ color: "#FA7A7A" }}>{event.status}</span>{" "}Your timesheet for{" "}
                                        {event.timeSheetDate} ,{convertTimeTo12HourFormat(event.startTime)}{" "}
                                        to {convertTimeTo12HourFormat(event.endTime)} engaged in{" "}
                                        {event.project} {event.activity}
                                      </>
                                    )}
                                  </>
                                )}

                              {selectedValue === "OTHER_ACTIVITIES" &&
                                entry.activityType === "OTHER_ACTIVITIES" && (
                                  <>
                                    <>
                                      You are assigned as{" "}
                                      {event.designationName} in {event.project}
                                    </>
                                  </>
                                )}
                            </div>
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  ) : (
                    <Typography
                      variant="h4"
                      style={{ textAlign: "center", padding: "100px" }}
                    >
                      No data available
                    </Typography>
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
