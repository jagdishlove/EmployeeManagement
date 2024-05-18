import { Close } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./leaves.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i - 1)}
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: i === currentPage + 1 ? "white" : "#008080",
            color: i === currentPage + 1 ? "#008080" : "white",
            border: `2px solid ${i === currentPage + 1 ? "#008080" : "white"}`,
          }}
          disabled={i === currentPage + 1}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        style={{
          margin: "5px",
          padding: "5px 10px",
          backgroundColor: "#ffffff ",
          color: "#008080",
          border: "2px solid #008080",
        }}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        style={{
          margin: "5px",
          padding: "5px 10px",

          backgroundColor: "#ffffff ",
          color: "#008080",
          border: "2px solid #008080",
        }}
      >
        Next
      </button>
    </div>
  );
};

const LeaveHistory = ({
  setLeaveReqstData,
  historyData,
  onDeleteLeave,
  setCurrentPage,
  currentPage,
  setDisableSave,
  clearErrorOnEdit,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  const managerData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.manager
  );

  const { data: leaveHistory, loading } = useSelector(
    (state) => state?.persistData?.leaveHistoryData
  );

  const handleEditAction = (data) => {
    clearErrorOnEdit();
    setLeaveReqstData({
      leaveRequestId: data.leaveRequestId,
      fromDate: data.fromDate,
      toDate: data.toDate,
      fromSession: data.fromSession,
      toSession: data.toSession,
      leaveMasterId: data.leaveMasterId,
      comments: data.comments,
      manager: managerData.managerName || "",
      cc: data.cc || "",
      file: data.fileStorageFileName,
    });

    setDisableSave(data.status);
    window.scroll(1, 1);
  };

  const isPastOrCurrentDate = (dateString) => {
    const currentDate = new Date();
    const comparisonDate = new Date(dateString);

    // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison
    currentDate.setHours(0, 0, 0, 0);
    comparisonDate.setHours(0, 0, 0, 0);

    return currentDate >= comparisonDate;
  };

  const handleDeleteAction = (leaveRequestId) => {
    setLeaveToDelete(leaveRequestId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    onDeleteLeave(leaveToDelete);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
  };

  const handlePageChange = (newPage) => {
    // You can fetch data for the new page or update the UI as needed
    console.log(newPage);
  };

  return (
    <Box className="dashedBorderStyle" s>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography className="leaveBalance" variant="h6">
            <b>HISTORY</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table className="leaveHistory">
              <TableHead className="leaveHistoryline">
                <TableRow className="leaveHistoryrow">
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    From
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    To
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    No of Days
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Leave Type
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Approval Manager
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    className="leaveHistorycol"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Actions
                  </TableCell>
                  {/* Add more columns for other fields */}
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData && historyData?.content?.length > 0 ? (
                  historyData?.content?.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {format(new Date(entry?.fromDate), "EEE, dd-MMM-yy")}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {format(new Date(entry?.toDate), "EEE, dd-MMM-yy")}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {entry?.noOfDays}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {entry?.leaveTransaction?.leaveMaster?.leaveTypes ===
                          "Adoption Leave For Female" ||
                        entry?.leaveTransaction?.leaveMaster?.leaveTypes ===
                          "Adoption Leave For Male"
                          ? "Adoption Leave"
                          : entry?.leaveTransaction?.leaveMaster?.leaveTypes}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {entry?.status === "SAVED" ? (
                          <>
                            {entry?.employee?.managerFirstName}{" "}
                            {entry?.employee?.managerLastName}
                          </>
                        ) : (
                          <>
                            {entry?.leaveApprovers?.map((approver, index) => (
                              <div key={index}>
                                {approver?.approverEmployee?.firstName}{" "}
                                {approver?.approverEmployee?.lastName}
                              </div>
                            ))}
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        {entry?.status === "APPROVED" &&
                        isPastOrCurrentDate(entry?.fromDate)
                          ? "AVAILED"
                          : entry?.status}
                      </TableCell>
                      <TableCell
                        className="leaveHistorycolumn"
                        style={{ textAlign: "center" }}
                      >
                        <IconButton
                          onClick={() => handleEditAction(entry)}
                          color="primary"
                          aria-label="Edit"
                          disabled={
                            (entry?.status === "APPROVED" &&
                              isPastOrCurrentDate(entry?.fromDate)) ||
                            entry?.status === "AVAILED" ||
                            entry?.status === "REJECTED"
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            handleDeleteAction(entry.leaveRequestId)
                          }
                          color="primary"
                          aria-label="Delete"
                          disabled={
                            (entry?.status === "APPROVED" &&
                              isPastOrCurrentDate(entry?.fromDate)) ||
                            entry?.status === "AVAILED" ||
                            entry?.status === "REJECTED"
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      No leave history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display={"flex"} gap={"10px"} mt={"10px"}>
            <Pagination
              totalItems={leaveHistory?.totalElements}
              itemsPerPage={10}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            {loading ? <CircularProgress /> : null}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-confirmation-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#D4D7E3",
            border: "1px solid #008080",
            borderRadius: "10px",
            width: "35%",
            padding: "10px",
          },
        }}
      >
        <DialogTitle
          id="delete-confirmation-dialog-title"
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginTop: "5%",
            color: "#000000",
            fontFamily: "Nunito Sans",
            lineHeight: "19.1px",
          }}
        >
          Change of Plans?
          <IconButton
            style={{ position: "absolute", top: "8px", right: "8px" }}
            onClick={handleDeleteCancel}
            color="primary"
            aria-label="Close"
          >
            <Close style={{ color: "black", width: "15px" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              textAlign: "center",
              fontSize: "14px",

              color: "#000000",
              fontFamily: "Nunito Sans",
              lineHeight: "19.1px",
            }}
          >
            Your leave request will be deleted permanently.
          </DialogContentText>
          <DialogContentText
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
            }}
          >
            Are you sure you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleDeleteConfirmation}
            color="primary"
            style={{
              borderRadius: "10px",
              backgroundColor: "#008080",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveHistory;
