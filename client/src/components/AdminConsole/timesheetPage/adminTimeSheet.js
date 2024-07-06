import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AdminTimesheetHeader from "./adminTimesheetHeader";
import TimesheetRow from "../../timesheetRow/timesheetRow";
import { useDispatch, useSelector } from "react-redux";
import {
  adminApproveTimesheet,
  adminBulkApproveTimesheet,
  adminRejectTimesheet,
  getAllTimeSheetApprovers,
  getAllTimeSheetForAdmin,
  resetAllTimesheetForAdminData,
} from "../../../redux/actions/AdminConsoleAction/timeSheet/adminTimesheetAction";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import icon from "../../../assets/Featured icon.svg";
import CloseIcon from "@mui/icons-material/Close";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const AdminTimeSheet = () => {
  const [approver, setApprover] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [states, setStatus] = useState("SUBMITTED");
  const [pageCounter, setPageCounter] = useState(0);
  const [errorValidation, setErrorValidation] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const dispatch = useDispatch();
  localStorage.setItem("selectedTabIndex", 0);
  const [comments, setComments] = useState({});
  const [ratings, setRatings] = useState({});
  const [selectedTimesheets, setSelectedTimesheets] = useState([]);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  // const [isChecked, setIsChecked] = useState(false);
  const [selectall, setSelectall] = useState(false);

  const params = {
    status: states,
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
  };
  const payload = {
    status: states,
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
    approverId: approver === "All" ? "" : approver,
  };

  useEffect(() => {
    dispatch(
      getAllTimeSheetApprovers({
        status: states,
        date:
          selectedDate !== "All"
            ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
            : "",
      })
    );
  }, [states, selectedDate, dispatch]);

  useEffect(() => {
    fetchMore();

    return () => dispatch(resetAllTimesheetForAdminData());
  }, []);

  const {
    allTimeSheetsForAdmin: adminTimeSheetData,
    allTimeSheetsForAdminLoading,
  } = useSelector((state) => state?.persistData?.adminTimeSheet);


  const { adminConsoleApproveTimesheetLoading } = useSelector(
    (state) => state?.persistData?.adminTimeSheet
  );
  const masterData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData
  );

  const approverList = useSelector(
    (state) => state?.persistData?.adminTimeSheet?.approversData
  );

  const approverNameMapping = {};

  approverList.forEach((approver) => {
    approverNameMapping[approver.id] = approver.approverName;
  });

  const handleSelectTimesheet = (timesheetId, rating, comment) => {
    setSelectedTimesheets((prevSelected) =>
      prevSelected.includes(timesheetId)
        ? prevSelected.filter((id) => id !== timesheetId)
        : [
            ...prevSelected,
            {
              timesheetEntryId: timesheetId,
              rating: rating,
              comment: comment,
            },
          ]
    );
  };

  const handleCommentChange = (entryId, comment) => {
    setComments((prevComments) => ({ ...prevComments, [entryId]: comment }));
  };

  const handleRatingChange = (entryId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [entryId]: rating }));
  };

  const handleSelectAll = () => {
    const entriesToApprove = adminTimeSheetData?.content || [];
    const updatedSelectedCards = {};
    const allSelected = !selectall;

    for (const entry of entriesToApprove) {
      updatedSelectedCards[entry.timesheetEntryId] = allSelected;
    }

    setSelectedCards(updatedSelectedCards);
    setSelectall(allSelected);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const approveSubmitHandler = async (data, rating, comment) => {
    const newErrors = validationForm(rating, comment, data, "approved");
    if (Object.keys(newErrors).length === 0) {
      const adminPayload = [
        {
          timesheetEntryId: data.timesheetEntryId,
          comment: comment || "APPROVED",
          rating: rating,
          approvalStatus: "APPROVED",
        },
      ];

      await dispatch(
        adminApproveTimesheet(
          adminPayload,
          payload,
          selectedSearchOption,
          params
        )
      );
      setErrorValidation({});
    } else {
      setErrorValidation({
        [data.timesheetEntryId]: newErrors,
      });
    }
  };

  const rejectButtonHandler = async (data, rating, comment) => {
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

    const adminPayload = [
      {
        timesheetEntryId: data.timesheetEntryId,
        comment: comment || "",
        rating: rating,
        approvalStatus: "REJECTED",
      },
    ];

    await dispatch(
      adminRejectTimesheet(adminPayload, payload, selectedSearchOption, params)
    );
    setErrorValidation({});
  };

  const bulkApproveHandler = async () => {
    const entriesToApprove = adminTimeSheetData?.content || [];

    const errors = {};
    const approvedEntries = [];

    for (const entry of entriesToApprove) {
      const newErrors = validationForm(ratings, entry, "approved");

      if (Object.keys(newErrors).length === 0) {
        const entryId = entry.timesheetEntryId;
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

    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(
          adminBulkApproveTimesheet(
            approvedEntries,
            {
              status: states,
              date:
                selectedDate !== "All"
                  ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format(
                      "YYYY-MM-DD"
                    )
                  : "",
              approverId: approver === "All" ? "" : approver,
              size: pageCounter,
            },
            selectedSearchOption,
            {
              status: states,
              date:
                selectedDate !== "All"
                  ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format(
                      "YYYY-MM-DD"
                    )
                  : "",
            }
          )
        );
        setErrorValidation({});
        setPageCounter(1);
      } finally {
        setOpenPopup(false);
      }
    } else {
      setErrorValidation(errors);
    }
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

  const fetchMore = () => {
    dispatch(
      getAllTimeSheetForAdmin(
        {
          status: states,
          date:
            selectedDate !== "All"
              ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format(
                  "YYYY-MM-DD"
                )
              : "",
          approverId: approver === "All" ? "" : approver,
          size: 10,
          page: pageCounter,
        },
        selectedSearchOption
      )
    );
    setPageCounter((counter) => counter + 1);
  };

  const approveSelectedLeavesHandler = async () => {
    const entriesToApprove = adminTimeSheetData?.content || [];

    const errors = {};
    const approvedEntries = [];

    for (const entry of entriesToApprove) {
      const entryId = entry.timesheetEntryId;

      // Check if the current entry is selected
      if (selectedCards[entryId]) {
        const newErrors = validationForm(entry, "approved");

        if (Object.keys(newErrors).length === 0) {
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
          errors[entryId] = newErrors;
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Dispatch the approval action for selected leaves
        dispatch(
          adminApproveTimesheet(
            approvedEntries,
            {
              status: states,
              date:
                selectedDate !== "All"
                  ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format(
                      "YYYY-MM-DD"
                    )
                  : "",
              approverId: approver === "All" ? "" : approver,
              size: 10,
            },
            selectedSearchOption,
            {
              status: states,
              date:
                selectedDate !== "All"
                  ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format(
                      "YYYY-MM-DD"
                    )
                  : "",
            }
          )
        );
        setErrorValidation({});
        setSelectedCards([]);
      } catch (error) {
        console.error("Error during selected leaves approval:", error);
      } finally {
        setOpenPopup(false);
        setOpenApproveDialog(false);
        setSelectall(!selectall);
      }
    } else {
      setErrorValidation(errors);
    }
  };

  const onCardSelect = (id, isSelected) => {
    setSelectedCards((prevSelected) => ({
      ...prevSelected,
      [id]: isSelected,
    }));
  };
  const handleOpenApproveDialog = () => {
    setOpenApproveDialog(true);
  };

  const handleCheckboxChange = (leaveRequestId) => {
    setSelectedCards((prevSelectedCards) => {
      const updatedSelectedCards = { ...prevSelectedCards };

      // Toggle the state of the clicked checkbox
      updatedSelectedCards[leaveRequestId] =
        !updatedSelectedCards[leaveRequestId];

      return updatedSelectedCards;
    });
  };

  const setApproverHandler = (newApprover) => {
    setApprover(newApprover);
    setSelectedCards({});
    setSelectall(false);
  };
  localStorage.removeItem("selectedProject");
  const loading =
    adminConsoleApproveTimesheetLoading || allTimeSheetsForAdminLoading;

  return (
    <Grid>
      <LoadingOverlay isLoading={loading} />
      <AdminTimesheetHeader
        setApprover={setApproverHandler}
        approver={approver}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        states={states}
        setStatus={setStatus}
        setSelectedSearchOption={setSelectedSearchOption}
        setSelectedCards={setSelectedCards}
        setSelectall={setSelectall}
      />
      {Object.values(selectedCards).some((isSelected) => isSelected) && (
        <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
          <Button
            sx={{
              background: "#008080",
              color: "white",
              marginLeft: 2,
              padding: "10px 15px",
              "&:hover": {
                background: "#006666",
              },
            }}
            onClick={handleOpenApproveDialog}
          >
            Approve TimeSheet
          </Button>
        </Box>
      )}

      <Dialog
        open={openApproveDialog}
        onClose={() => setOpenApproveDialog(false)}
        PaperProps={{
          style: {
            borderRadius: 20,
            padding: 10,
          },
        }}
      >
        <DialogTitle>
          <img src={icon} /> Approve{" "}
          {
            Object.values(selectedCards).filter((value) => value === true)
              .length
          }
          /{adminTimeSheetData?.totalElements} Leaves
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve all the selected Timesheet?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveDialog(false)}>Cancel</Button>
          <Button onClick={approveSelectedLeavesHandler}>Approve</Button>
        </DialogActions>
      </Dialog>
      {states === "SUBMITTED" &&
        adminTimeSheetData?.content?.length > 0 &&
        approver !== "All" && (
          <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
            <Typography mr={2} mt={1}>
              Select All
            </Typography>
            <Checkbox
              checked={selectall}
              sx={{ cursor: "pointer" }}
              onClick={handleSelectAll}
            />
          </Box>
        )}

      {adminTimeSheetData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No TimeSheet requests found.</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminTimeSheetData?.content?.length || 0}
          hasMore={adminTimeSheetData?.content?.length !== 0}
          next={pageCounter === 0 ? "" : fetchMore}
        >
          {adminTimeSheetData?.content?.map((entry) => (
            <TimesheetRow
              key={entry.timesheetEntryId}
              data={entry}
              superAdmin={true}
              approval={true}
              selected={selectedTimesheets.includes(entry.timesheetEntryId)}
              onSelect={handleSelectTimesheet}
              approveSubmitHandler={approveSubmitHandler}
              rejectButtonHandler={rejectButtonHandler}
              bulkApproveHandler={bulkApproveHandler}
              errorValidation={errorValidation[entry.timesheetEntryId]}
              activityType={entry.activityType}
              comments={comments[entry.timesheetEntryId] || ""}
              ratings={ratings[entry.timesheetEntryId] || 5}
              onCommentChange={(comment) =>
                handleCommentChange(entry.timesheetEntryId, comment)
              }
              onRatingChange={(rating) =>
                handleRatingChange(entry.timesheetEntryId, rating)
              }
              onCardSelect={onCardSelect}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </InfiniteScroll>
      )}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClosePopup}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <img src={icon} alt="icon" /> Approve{" "}
          <b>
            {adminTimeSheetData?.numberOfElements
              ? adminTimeSheetData.numberOfElements
              : "0"}
            /
            {adminTimeSheetData?.totalElements
              ? adminTimeSheetData.totalElements
              : "0"}
          </b>{" "}
          Timesheets
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to approve all the submitted timesheets from{" "}
            &apos;{approverNameMapping[approver]} workspace&apos;?
          </p>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AdminTimeSheet;
