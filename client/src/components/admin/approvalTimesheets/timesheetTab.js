// import { format } from "date-fns";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  approveTimesheet,
  getTimesheetEntryApprovalAction,
  rejectTimesheet,
} from "../../../redux/actions/timeSheet/timeSheetAction";
import { formatDateForApi } from "../../../utils/dateOptions";

import { Box, Typography } from "@mui/material";
import TimesheetRow from "../../timesheetRow/timesheetRow";
import AdminSubHeader from "./adminSubHeader";

const TimesheetTab = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("All");
  const [counter, setCounter] = useState(2);

  const approvalData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.approvalTimesheetData
  );
  const [errorValidation, setErrorValidation] = useState({});
  const [projects, setProjects] = useState("All"); // Set default value to "All"
  const [teamMember, setTeamMember] = useState("All");
  const [newDateDashboard, setNewDateDashboard] = useState("All");

  const [setPayloadData] = useState(null);
  const newSize = 10 * counter;
  const masterData = useSelector((state) => state.persistData.masterData);

  const newPayload = {
    projectId: projects === "All" ? "" : projects || "",
    empId: teamMember === "All" ? "" : teamMember || "",
    size: newSize,
    date: newDateDashboard === "All" ? "" : formatDateForApi(newDateDashboard),
  };

  const fetchMore = () => {
    dispatch(getTimesheetEntryApprovalAction(newPayload));
    setCounter(counter + 1);
  };
  const validationForm = (rating, comment, data) => {
    const newErrors = {};

    let activity = {};

    for (var i = 0; i < masterData.activity.length; i++) {
      if (data.activityId === masterData.activity[i].activityId) {
        activity = masterData.activity[i];
      }
    }

    if (activity.approvalCommentRequired === true && !comment) {
      newErrors.adminCommentError =
        "Please add details in the comments section.";
    }
    if (activity.approvalCommentRequired === true && comment === "Approved") {
      newErrors.adminCommentError =
        "Please add details in the comments section.";
    }
    if (activity.approvalRatingRequired === true && !rating) {
      newErrors.ratingError = "Please add a rating";
    }

    return newErrors;
  };

  const approveSubmitHandler = (data, rating, comment) => {
    const newErrors = validationForm(rating, comment, data);
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        timesheetEntryId: data.timesheetEntryId,
        comment: comment,
        rating: rating,
        approvalStatus: "APPROVED",
      };
      dispatch(approveTimesheet(payload, newPayload));

      // Clear errors for the current entry
      setErrorValidation({});
    } else {
      setErrorValidation({
        [data.timesheetEntryId]: newErrors,
      });
    }
  };

  const rejectButtonHandler = (data, rating, comment) => {
    const newErrors = validationForm(rating, comment, data);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        timesheetEntryId: data.timesheetEntryId,
        comment: comment,
        rating: rating,
        approvalStatus: "REJECTED",
      };
      dispatch(rejectTimesheet(payload, newPayload));

      // Clear errors for the current entry
      setErrorValidation({});
    } else {
      setErrorValidation({
        [data.timesheetEntryId]: newErrors,
      });
    }
  };

  return (
    <Box>
      <AdminSubHeader
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setProjects={setProjects}
        setTeamMember={setTeamMember}
        projects={projects}
        teamMember={teamMember}
        setNewDateDashboard={setNewDateDashboard}
        newDateDashboard={newDateDashboard}
      />

      {approvalData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography> No TimeSheet requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={approvalData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {approvalData ? (
            approvalData?.content?.map((entry) => (
              <TimesheetRow
                key={entry.timesheetEntryId}
                data={entry}
                approval={true}
                approveSubmitHandler={approveSubmitHandler}
                rejectButtonHandler={rejectButtonHandler}
                setPayloadData={setPayloadData}
                errorValidation={errorValidation[entry.timesheetEntryId]}
                activityType={entry.activityType} // Pass the activityType prop
              />
            ))
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>
              Loading..
            </h1>
          )}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default TimesheetTab;
