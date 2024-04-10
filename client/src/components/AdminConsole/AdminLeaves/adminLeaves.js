import {
  Box,
  Button,
  Checkbox,
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
  const [openApproveDialog, setOpenApproveDialog] = useState(false);

  const [errorValidation, setErrorValidation] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectAll, setSelectall] = useState(false);
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
    const newErrors = validationForm(approverComment, status);
 
    if (Object.keys(newErrors).length === 0) {
      const payload = [
        {
          leaveRequestId: id,
          approverComment: approverComment || "APPROVED",
          status,
        },
      ];
      await dispatch(
        adminApproveRejectLeavesAction(
          payload,
          getPayload,
          selectedSearchOption
        )
      );
    } else {
      setError({ ...newErrors, [id]: newErrors });
    }
  };

  const handleSelectAll = () => {
    const entriesToApprove = adminLeavesData?.content || [];
    const updatedSelectedCards = {};

    for (const entry of entriesToApprove) {
      updatedSelectedCards[entry.leaveRequestId] = !isChecked;
    }

    setSelectedCards(updatedSelectedCards);
    setIsChecked((prevIsChecked) => !prevIsChecked);
    setSelectall(!selectAll);
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

    const errors = {};
    const approvedEntries = [];


    for (const entry of entriesToApprove) {
      const newErrors = validationForm(entry, "approved");

      if (Object.keys(newErrors).length === 0) {
        const entryId = entry.leaveRequestId;

        // Extract values from comments and ratings objects
        const commentValue = comments[entryId];
        const approvedEntries = [];

        approvedEntries.push({
          leaveRequestId: entryId,
          approverComment: commentValue || "APPROVED",
          status: "APPROVED",
        });
      } else {
        errors[entry.leaveRequestId] = newErrors;
      }
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Dispatch the bulk approval action with the updated comments
        dispatch(adminApproveRejectLeavesAction(approvedEntries));
        setErrorValidation({});
      } catch (error) {
        console.error("Error during bulk approval:", error);
      } finally {
        setOpenPopup(false);
      }
    } else {
      setErrorValidation(errors);
    }
  };

  const approveSelectedLeavesHandler = async () => {
    const entriesToApprove = adminLeavesData?.content || [];

    const errors = {};
    const approvedEntries = [];

    for (const entry of entriesToApprove) {
      const entryId = entry.leaveRequestId;

      // Check if the current entry is selected
      if (selectedCards[entryId]) {
        const newErrors = validationForm(entry, "approved");

        if (Object.keys(newErrors).length === 0) {
          // Extract values from comments and ratings objects
          const commentValue = comments[entryId];

          approvedEntries.push({
            leaveRequestId: entryId,
            approverComment: commentValue || "APPROVED",
            status: "APPROVED",
          });
        } else {
          errors[entryId] = newErrors;
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Dispatch the approval action for selected leaves
        dispatch(adminApproveRejectLeavesAction(approvedEntries));
        setErrorValidation({});
      } catch (error) {
        console.error("Error during selected leaves approval:", error);
      } finally {
        setOpenPopup(false);
        setOpenApproveDialog(false);
        setSelectall(!selectAll);
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
            Approve Leaves
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
          /{adminLeavesData?.totalElements} Leaves
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve all the selected Leaves?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveDialog(false)}>Cancel</Button>
          <Button onClick={approveSelectedLeavesHandler}>Approve</Button>
        </DialogActions>
      </Dialog>

      {leaveStatus === "SUBMITTED" &&
      approver !== "All" &&
      resultFilterData?.content?.length > 0 ? (
        <>
          <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
            <Typography mr={2}>Select All</Typography>
            <Checkbox
              checked={selectAll}
              sx={{ cursor: "pointer" }}
              onClick={handleSelectAll}
            />
          </Box>
        </>
      ) : (
        <></>
      )}

      {resultFilterData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No Leave Applications Available</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={adminLeavesData?.content?.length || 0}
          hasMore={true}
          next={fetchMore}
        >
          {leaveStatus === "SUBMITTED" &&
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
                error={error}
                onCardSelect={onCardSelect}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}

          {/* Conditionally render the ApprovedLeavesTable for "APPROVED" status */}
          {leaveStatus !== "SUBMITTED" && (
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
          <img src={icon} /> Approve{" "}
          {
            <b>
              {" "}
              {adminLeavesData?.numberOfElements
                ? adminLeavesData.numberOfElements
                : "0"}
              /
              {adminLeavesData?.totalElements
                ? adminLeavesData.totalElements
                : "0"}
            </b>
          }{" "}
          Leaves
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to approve all the submitted Leaves from
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
