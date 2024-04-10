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

const ITEMS_PER_PAGE = 3; // Change this as needed

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
  console.log("timesheetData", otherActivityData);
  useEffect(() => {
    dispatch(masterDataAction());

    dispatch(getMySpaceActivityAction(selectedValue));
  }, [selectedValue, dispatch]);

  const otherActivityList = useSelector(
    (state) => state.persistData.masterData?.dashBoardActivity
  );

  const timelineData = [
    {
      date: "2024-03-25T03:25:38.913+00:00",
      activityType: "LEAVES",
      events: [
        {
          time: "20:00:00",
          leaveType: "LOP",
          status: "Approved",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Task",
          ProjectName:"Kairos"
        },
        {
          time: "18:00:00",
          leaveType: "Privilege Leave",
          status: "Submitted",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Mani",
          projectTask: "Kairos Task",
          ProjectName:"Kairos"
        },
        {
          time: "19:00:00",
          leaveType: "Casual Leave",
          status: "Rejected",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Amit",
          projectTask: "Kairos Task",
          ProjectName:"Kairos"
        },
      ],
    },
    {
      date: "2024-03-25T03:25:38.913+00:00",
      activityType: "TIMESHEET",
      events: [
        {
          time: "03:00:00",
          leaveType: "Privilege Leave",
          status: "Submitted",
          fromDate: "2024-04-23T03:25:38.913+00:00",
          toDate: "2024-04-24T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Meeting",
          ProjectName:"Kairos"
        },
        {
          time: "01:00:00",
          leaveType: "LOP",
          status: "Approved",
          fromDate: "2024-04-01T03:25:38.913+00:00",
          toDate: "2024-04-02T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Meeting",
          ProjectName:"Kairos"
        },
        {
          time: "11:00:00",
          leaveType: "Casual Leave",
          status: "Rejected",
          fromDate: "2024-04-11T03:25:38.913+00:00",
          toDate: "2024-04-12T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Amit",
          projectTask: "Kairos Meeting",
          ProjectName:"Kairos"
        },
      ],
    },
    {
      date: "2024-03-25T03:25:38.913+00:00",
      activityType: "OTHER_ACTIVITIES",
      events: [
        {
          time: "08:00:00",
          leaveType: "LOP",
          status: "Approved",
          fromDate: "2024-04-05T03:25:38.913+00:00",
          toDate: "2024-04-05T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Deepak",
          projectTask: "Kairos Task",
          ProjectName:"Kairos"
        },
        {
          time: "14:00:00",
          leaveType: "Privilege Leave",
          status: "Submitted",
          fromDate: "2024-04-03T03:25:38.913+00:00",
          toDate: "2024-04-03T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Mani",
          projectTask: "Kairos Task",
          ProjectName:"Kairos"
        },
        {
          time: "10:00:00",
          leaveType: "Casual Leave",
          status: "Rejected",
          fromDate: "2024-04-11T03:25:38.913+00:00",
          toDate: "2024-04-11T03:25:38.913+00:00",
          startTime: "09:00:00",
          endTime: "10:00:00",
          managerName: "Amit",
          projectTask: "Kairos Meeting",
          ProjectName:"Kairos"
        },
      ],
    },
  ];
  const currentPageData = timelineData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
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
            {Math.ceil(timelineData.length / ITEMS_PER_PAGE)} Pages
          </Typography>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(timelineData.length / ITEMS_PER_PAGE) - 1
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
            {currentPageData.map((entry, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  color="textSecondary"
                  sx={{ maxWidth: "11%" }}
                >
                  {entry.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index < currentPageData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  {entry.events.map((event, eventIndex) => (
                    <React.Fragment key={eventIndex}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{event.time}</div>

                        <div
                          style={{
                            border: "1px dotted #ccc",
                            flex: 1,
                            marginLeft: "16px",
                            padding: "10px 20px",
                            margin: "15px 20px",
                            maxWidth: "89%", // Set maximum width to 60% of its container
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
                                    {event.fromDate} to {event.toDate} has been
                                    approved by {event.managerName}.
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
                                    You {event.status} a timesheet for
                                    {event.fromDate} {event.startTime} to{" "}
                                    {event.endTime}
                                    engaged in {event.projectTask}
                                  </>
                                )}
                                {event.status === "Approved" && (
                                  <>
                                    {event.managerName} has {event.status} Your
                                    timesheet for
                                    {event.fromDate} {event.startDate} to{" "}
                                    {event.endTime} engaged in{" "}
                                    {event.projectTask}
                                  </>
                                )}
                                {event.status === "Rejected" && (
                                  <>
                                    {event.managerName} has {event.status} Your
                                    timesheet for
                                    {event.fromDate} {event.startDate} to{" "}
                                    {event.endTime} engaged in{" "}
                                    {event.projectTask}
                                  </>
                                )}
                              </>
                            )}

                          {selectedValue === "OTHER_ACTIVITIES" &&
                            entry.activityType === "OTHER_ACTIVITIES" && (
                              <>
                                {event.status === "Submitted" && (
                                  <>
                                    You {event.status} a timesheet for
                                    {event.fromDate} {event.startTime} to{" "}
                                    {event.endTime}
                                    engaged in {event.projectTask}
                                  </>
                                )}
                                {event.status === "Approved" && (
                                  <>
                                    {event.managerName} has {event.status} Your
                                    timesheet for
                                    {event.fromDate} {event.startTime} to{" "}
                                    {event.endTime} engaged in{" "}
                                    {event.projectTask}
                                  </>
                                )}
                                {event.status === "Rejected" && (
                                  <>
                                    Your timesheet for {""}
                                    {event.fromDate} {event.startDate} to{" "}
                                    {event.endTime} {event.projectTask}{" "}
                                    {event.status} by {""}
                                    {event.managerName}
                                  </>
                                )}
                              </>
                            )}
                        </div>
                      </div>
                      {eventIndex < entry.events.length - 1 && (
                        <TimelineConnector />
                      )}
                    </React.Fragment>
                  ))}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomBorderComponent;
