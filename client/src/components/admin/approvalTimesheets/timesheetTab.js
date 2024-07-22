import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  approveTimesheet,
  getTimesheetEntryApprovalAction,
  rejectTimesheet,
} from "../../../redux/actions/timeSheet/timeSheetAction";
import { formatDateForApi } from "../../../utils/dateOptions";

import { Box, CircularProgress, Typography } from "@mui/material";
import TimesheetRow from "../../timesheetRow/timesheetRow";
import AdminSubHeader from "./adminSubHeader";

const TimesheetTab = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("All");
  const [counter, setCounter] = useState(2);

  const approvalData = useSelector(
    (state) => state?.persistData?.timesheetData?.approvalTimesheetData
  );
  const [errorValidation, setErrorValidation] = useState({});
  const [projects, setProjects] = useState("All"); // Set default value to "All"
  const [teamMember, setTeamMember] = useState("All");
  const [newDateDashboard, setNewDateDashboard] = useState("All");
  const [loading, setLoading] = useState(false);
  const [setPayloadData] = useState(null);
  const newSize = 10 * counter;
  const masterData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData
  );

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
  const validationForm = (rating, data) => {
    const newErrors = {};

    let activity = {};

    for (var i = 0; i < masterData.activity.length; i++) {
      if (data.activityId === masterData.activity[i].activityId) {
        activity = masterData.activity[i];
      }
    }

    if (activity.approvalRatingRequired === true && !rating) {
      newErrors.ratingError = "Please add a rating";
    }

    return newErrors;
  };

  const approveSubmitHandler = async (data, rating, comment) => {
    const newErrors = validationForm(rating, comment, data, "approved");
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const payload = {
          timesheetEntryId: data.timesheetEntryId,
          comment: comment || "APPROVED",
          rating: rating,
          approvalStatus: "APPROVED",
        };

        await dispatch(approveTimesheet(payload, newPayload));
        setErrorValidation({});
      } finally {
        setLoading(false);
      }
    } else {
      setErrorValidation({
        [data.timesheetEntryId]: newErrors,
      });
    }
  };

  const rejectButtonHandler = async (data, rating, comment) => {
    setLoading(true);
    try {
      const activity = masterData.activity.find(
        (activity) => activity.activityId === data.activityId
      );

      if (activity && activity.approvalCommentRequired && !comment) {
        setErrorValidation({
          [data.timesheetEntryId]: {
            adminCommentError: "Please add details in the comments section.",
          },
        });
        return;
      }

      const payload = {
        timesheetEntryId: data.timesheetEntryId,
        comment: comment || "",
        rating: rating,
        approvalStatus: "REJECTED",
      };

      await dispatch(rejectTimesheet(payload, newPayload));
      setErrorValidation({});
    } finally {
      setLoading(false);
    }
  };
  localStorage.removeItem("ccurrentPage");
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
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(255, 255, 255, 0.7)"
        >
          {/* <h3 style={{ color: '#008080' }}>Updating Records...</h3> */}
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TimesheetTab;
