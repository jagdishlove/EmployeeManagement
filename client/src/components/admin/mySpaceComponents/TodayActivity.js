import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Grid } from "@mui/material";
import "./TodayActivity.css";

const TodayActivity = () => {
  const todayActivityData =
    useSelector((state) => state?.persistData?.workSpace?.todayActivity) || [];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  // Define formatTime function
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const formattedHour = hourInt % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minute} ${ampm}`;
  };

  // Map todayActivityData into lines array
  useEffect(() => {
    const lines = todayActivityData.flatMap((entry, index) => {
      const timesheetLines = entry.timesheetEntryActivity.map(
        (activity, activityIndex) => {
          const date = activity.timeSheetDate;
          const startTime = formatTime(activity.startTime); // Format start time
          const endTime = formatTime(activity.endTime); // Format end time
          const project = activity.project;
          const activityType = activity.activity;
          const status = activity.status;
          const timesheetApproval = activity.timesheetApproval;

          const key = `timesheet_${index}_${activityIndex}`;

          let statusColor;
          if (status === "APPROVED") {
            statusColor = "#0A865A";
          } else if (status === "REJECTED") {
            statusColor = "#FA7A7A";
          } else {
            statusColor = "black"; // Default color for other statuses
          }

          const sentence =
            status === "SUBMITTED"
              ? `<span style="color: black;">You submitted a timesheet for ${date}: ${startTime} to ${endTime} Engaged in ${activityType} - ${project}</span>`
              : `${timesheetApproval} has <span style="color: ${statusColor};">${status}</span> your timesheet for ${date}: ${startTime} to ${endTime} Engaged in ${activityType} - ${project}.`;

          return (
            <div key={key}>
              <p dangerouslySetInnerHTML={{ __html: sentence }} />{" "}
              {/* Render the constructed sentence */}
              {status !== "SUBMITTED" && (
                <> </> // Add space
              )}
            </div>
          );
        }
      );

      const leaveLines = entry.leaveRequestActivity.map((leave, leaveIndex) => {
        const fromDate = leave.fromDate;
        const toDate = leave.toDate;
        const status = leave.status;
        const leaveMaster = leave.leaveMaster;
        const leaveApprovers = leave.leaveApprover;

        const key = `leave_${index}_${leaveIndex}`;

        let sentence;
        let statusColor;

        if (status === "SUBMITTED") {
          sentence = `You submitted ${leaveMaster} from ${fromDate} to ${toDate} to ${leaveApprovers}`;
          statusColor = "black";
        } else {
          const timesheetApproval =
            status === "APPROVED"
              ? `Your submitted ${leaveMaster}`
              : "Your Leave";
          const statusText = status === "APPROVED" ? " APPROVED" : "REJECTED";

          statusColor = status === "APPROVED" ? "#0A865A" : "#FA7A7A";

          sentence = `${timesheetApproval} from ${fromDate} to ${toDate} has been <span style="color: ${statusColor};">${statusText}</span> by ${leaveApprovers}`;
        }

        return (
          <div key={key}>
            <p dangerouslySetInnerHTML={{ __html: sentence }} />
          </div>
        );
      });

      const projectResourceLines = entry.projectResourceActivity.map(
        (project) => {
          const projectName = project.project;
          const designationName = project.designationName;

          return `You are assigned as ${designationName} in “${projectName}” projects.`;
        }
      );

      return [...timesheetLines, ...leaveLines, ...projectResourceLines];
    });
    setDisplayedLines(lines);
  }, [todayActivityData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex(
        (prevIndex) => (prevIndex + 1) % displayedLines.length
      );
    }, 3000); // Adjust the interval timing as needed

    return () => clearInterval(interval);
  }, [displayedLines]);

  return (
    <>
      <Card
        sx={{
          border: "1px solid silver",
          marginTop: "5px",
          marginLeft: "15px",
          width: "95%",
          height: "130px",
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} sx={{ color: "silver", ml: "4px" }}>
          Todays Activities
        </Grid>
        <Grid item xs={12} sx={{ ml: "10px" }}>
          <div className="marquee-container">
            <div className="marquee">
              <ul>
                {displayedLines.map((line, index) => (
                  <li
                    key={index}
                    className={
                      index === currentLineIndex ? "visible" : "hidden"
                    }
                  >
                    <b>{line}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Grid>
      </Card>
    </>
  );
};

export default TodayActivity;
