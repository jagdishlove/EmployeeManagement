import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminTimesheetHeader from "./adminTimesheetHeader";
import TimesheetRow from "../../timesheetRow/timesheetRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTimeSheetApprovers,
  getAllTimeSheetForAdmin,
} from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import icon from "../../../assets/Featured icon.svg";

function AdminTimeSheet() {
  const [approver, setApprover] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [states, setStatus] = useState("SUBMITTED");
  const [pageCounter, setPageCounter] = useState(2);
  const [errorValidation, setErrorValidation] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const dispatch = useDispatch();

  const [comments, setComments] = useState({});
  const [ratings, setRatings] = useState({});

  const handleCommentChange = (entryId, comment) => {
    setComments((prevComments) => ({ ...prevComments, [entryId]: comment }));
  };

  const handleRatingChange = (entryId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [entryId]: rating }));
  };

  const params = {
    status: states,
  };

  const data = {
    status: states,
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
    approverId: approver === "All" ? "" : approver,
    size: pageCounter * 5,
  };

  useEffect(() => {
    dispatch(getAllTimeSheetApprovers(params));
  }, [states]);

  useEffect(() => {
    dispatch(getAllTimeSheetForAdmin(data, selectedSearchOption));
  }, [selectedDate, selectedSearchOption, approver, states]);

  const adminTimeSheetData = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.allTimeSheetsForAdmin
  );

  const masterData = useSelector((state) => state.persistData.masterData);

  const approverList = useSelector(
    (state) => state?.nonPersist?.adminTimeSheet?.approversData
  );

  const approverNameMapping = {};

  approverList.forEach((approver) => {
    approverNameMapping[approver.id] = approver.approverName;
  });

  const handleSlectAll = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
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
      try {
        setErrorValidation({});
      } finally {
        console.log("hello");
      }
    } else {
      setErrorValidation({
        [data.timesheetEntryId]: newErrors,
      });
    }
  };

  const rejectButtonHandler = async (data, rating, comment) => {
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
      setErrorValidation({});
    } finally {
      console.log("hello");
    }
  };

  const bulkApproveHandler = async () => {
    const entriesToApprove = adminTimeSheetData?.content || [];

    if (entriesToApprove.length === 0) {
      console.log("No entries to approve");
      return;
    }

    const errors = {};
    const approvedEntries = [];

    for (const entry of entriesToApprove) {
      const newErrors = validationForm(ratings, entry, "approved");

      if (Object.keys(newErrors).length === 0) {
        const entryId = entry.timesheetEntryId;

        // Extract values from comments and ratings objects
        const commentValue = comments[entryId];
        const ratingValue = ratings[entryId];

        approvedEntries.push({
          timesheetEntryId: entryId,
          comment: commentValue || "APPROVED",
          rating: ratingValue || 5,
          approvalStatus: "APPROVED",
        });
      } else {
        errors[entry.timesheetEntryId] = newErrors;
      }
    }

    console.log("approvedEntries", approvedEntries);

    if (Object.keys(errors).length === 0) {
      try {
        // Dispatch the bulk approval action with the updated comments

        setErrorValidation({});
        console.log("Bulk approval successful");
      } catch (error) {
        console.error("Error during bulk approval:", error);
      } finally {
        setOpenPopup(false);
      }
    } else {
      setErrorValidation(errors);
    }
  };

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      status: states,
      date:
        selectedDate !== "All"
          ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
          : "",
      approverId: approver === "All" ? "" : approver,
      size: nextPage,
    };

    dispatch(getAllTimeSheetForAdmin(nextPagePayload, selectedSearchOption));
    setPageCounter((counter) => counter + 1);
  };

  return (
    <Grid>
      <AdminTimesheetHeader
        setApprover={setApprover}
        approver={approver}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        states={states}
        setStatus={setStatus}
        setSelectedSearchOption={setSelectedSearchOption}
      />
      {states === "SUBMITTED" && !(approver === "All") ? (
        <>
          <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
            <Typography mr={2}>Select All</Typography>
            <CheckBoxOutlineBlankIcon
              sx={{ cursor: "pointer" }}
              onClick={handleSlectAll}
            />
          </Box>
        </>
      ) : (
        <></>
      )}

      {adminTimeSheetData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography> No TimeSheet requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminTimeSheetData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {adminTimeSheetData ? (
            adminTimeSheetData?.content?.map((entry) => (
              <TimesheetRow
                key={entry.timesheetEntryId}
                data={entry}
                superAdmin={true}
                approval={true}
                approveSubmitHandler={approveSubmitHandler}
                rejectButtonHandler={rejectButtonHandler}
                bulkApproveHandler={bulkApproveHandler}
                errorValidation={errorValidation[entry.timesheetEntryId]}
                activityType={entry.activityType} // Pass the activityType prop
                comments={comments[entry.timesheetEntryId] || ""}
                ratings={ratings[entry.timesheetEntryId] || 5}
                onCommentChange={(comment) =>
                  handleCommentChange(entry.timesheetEntryId, comment)
                }
                onRatingChange={(rating) =>
                  handleRatingChange(entry.timesheetEntryId, rating)
                }
              />
            ))
          ) : (
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>
              Loading..
            </h1>
          )}
        </InfiniteScroll>
      )}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>
          {" "}
          <img src={icon} /> Approve 500 Timesheets
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to approve all the submitted timesheets from
            &apos;{approverNameMapping[approver]} workspace&apos; ?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={bulkApproveHandler}
            sx={{
              color: "#fff",
              borderRadius: "8px",
              backgroundColor: "#008080",
              "&:hover": {
                backgroundColor: "#008080",
              },
              textTransform: "capitalize",
            }}
          >
            Approve
          </Button>
          <Button
            onClick={handleClosePopup}
            sx={{
              color: "#000",
              borderRadius: "8px",
              border: "1px solid #D0D5DD",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default AdminTimeSheet;
