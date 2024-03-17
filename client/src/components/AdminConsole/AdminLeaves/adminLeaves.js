import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  adminApproveRejectLeavesAction,
  getAllLeavesApproversAction,
  getAllLeavesForAdminAction,
} from "../../../redux/actions/AdminConsoleAction/leaves/adminLeaveAction";
import LeavesHeader from "./leavesHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import DataCard from "../../admin/approvalLeaves/DataCard";
import ApprovedLeaveTable from "./approvedLeaveTable";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import icon from "../../../assets/Featured icon.svg";

const AdminLeaves = () => {
  const dispatch = useDispatch();
  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const SUBMITTED = "SUBMITTED";
  const [leaveStatus, setLeaveStatus] = useState(SUBMITTED);
  const [selectedDate, setSelectedDate] = useState("All");
  const [approver, setApprover] = useState("All");
  const [pageCounter, setPageCounter] = useState(2);
  const [resultFilterData, setResultFilterData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorValidation, setErrorValidation] = useState({});
  const [comments, setComments] = useState({});

  const getPayload = {
    size: 5 * 2,
    status: leaveStatus,
    date:
      selectedDate !== "All"
        ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
        : "",
    approverId: approver === "All" ? "" : approver,
  };

  useEffect(() => {
    dispatch(getAllLeavesForAdminAction(selectedSearchOption, getPayload));
  }, [selectedDate, leaveStatus, approver, dispatch, selectedSearchOption]);

  const adminLeavesData = useSelector(
    (state) => state?.nonPersist?.adminLeaves?.allLeavesForAdmin
  );

  useEffect(() => {
    setResultFilterData(adminLeavesData);
  }, [adminLeavesData]);

  //for approver dropdown
  const params = {
    status: leaveStatus,
  };

  const approverList = useSelector(
    (state) => state?.nonPersist?.adminLeaves?.leavesApproversData
  );

  useEffect(() => {
    dispatch(getAllLeavesApproversAction(params));
  }, [leaveStatus]);

  const approverNameMapping = {};

  approverList.forEach((approver) => {
    approverNameMapping[approver.id] = approver.approverName;
  });

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
      status: leaveStatus,
      date:
        selectedDate !== "All"
          ? dayjs(selectedDate, { format: "YYYY-MM-DD" }).format("YYYY-MM-DD")
          : "",
      approverId: approver === "All" ? "" : approver,
    };

    dispatch(getAllLeavesForAdminAction(selectedSearchOption, nextPagePayload));
    setPageCounter((counter) => counter + 1);
  };

  const approveRejectLeavesHandler = async (id, status, approverComment) => {
    const payload = [
      {
        leaveRequestId: id,
        approverComment: approverComment || "APPROVED",
        status,
      },
    ];
    await dispatch(
      adminApproveRejectLeavesAction(payload, getPayload, selectedSearchOption)
    );
  };

  const handleSlectAll = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleCommentChange = (entryId, comment) => {
    setComments((prevComments) => ({ ...prevComments, [entryId]: comment }));
  };

  const validationForm = (approverComment, status) => {
    let newErrors = "";
    if (!approverComment && status === "REJECTED") {
      newErrors = "Please add details in the comments section.";
    }
    return newErrors;
  };

  const bulkApproveHandler = async () => {
    const entriesToApprove = adminLeavesData?.content || [];

    if (entriesToApprove.length === 0) {
      console.log("No entries to approve");
      return;
    }

    const errors = {};
    const approvedEntries = [];

    for (const entry of entriesToApprove) {
      const newErrors = validationForm(entry, "approved");

      if (Object.keys(newErrors).length === 0) {
        const entryId = entry.leaveRequestId;

        // Extract values from comments and ratings objects
        const commentValue = comments[entryId];

        approvedEntries.push({
          leaveRequestId: entryId,
          approverComment: commentValue || "APPROVED",
          status: "APPROVED",
        });
      } else {
        errors[entry.leaveRequestId] = newErrors;
      }
    }

    console.log("approvedEntries", approvedEntries);

    if (Object.keys(errors).length === 0) {
      try {
        // Dispatch the bulk approval action with the updated comments
        dispatch(adminApproveRejectLeavesAction(approvedEntries));
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

  return (
    <div>
      <LeavesHeader
        setSelectedSearchOption={setSelectedSearchOption}
        leaveStatus={leaveStatus}
        setLeaveStatus={setLeaveStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setApprover={setApprover}
        approver={approver}
      />

      {leaveStatus === "SUBMITTED" ? (
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

      {resultFilterData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No Project Data Found</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminLeavesData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {leaveStatus !== "APPROVED" &&
            adminLeavesData?.content?.map((cardData) => (
              <DataCard
                key={cardData.leaveRequestId}
                cardData={cardData}
                index={cardData.leaveRequestId}
                approveRejectLeavesHandler={approveRejectLeavesHandler}
                adminComments={comments[cardData.leaveRequestId] || ""}
                onCommentChange={(comment) =>
                  handleCommentChange(cardData.leaveRequestId, comment)
                }
                superAdmin={true}
                errorValidation={errorValidation[cardData.leaveRequestId]}
              />
            ))}

          {/* Conditionally render the ApprovedLeavesTable for "APPROVED" status */}
          {leaveStatus === "APPROVED" && (
            <ApprovedLeaveTable leavesData={resultFilterData?.content || []} />
          )}
        </InfiniteScroll>
      )}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        PaperProps={{
          style: {
            borderRadius: 20,
            padding: 10,
          },
        }}
      >
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
    </div>
  );
};

export default AdminLeaves;
