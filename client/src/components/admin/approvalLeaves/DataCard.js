import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HiddenDataCard from "./HiddenDataCard";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const DataCard = ({
  cardData,
  approveRejectLeavesHandler,
  approval,
  leaveRequest,
  error,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState();

  const handleApproval = (status, leaveRequestId) => {
    approveRejectLeavesHandler(leaveRequestId, status, comments);
  };

  const masterData = useSelector((state) => state?.persistData?.masterData);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  const getLeaveType = (leaveMasterId) => {
    const leaveTypeObject = masterData?.leaveTypesForView?.find(
      (data) => data.leaveMasterId === leaveMasterId
    );
    return leaveTypeObject ? leaveTypeObject.leaveType : "";
  };
  return (
    <Box sx={{ marginTop: "25px" }}>
      <Accordion
        elevation={0}
        sx={{
          border: "2px solid #008080",
        }}
        expanded={expanded}
      >
        <AccordionSummary
          expandIcon={
            <Box display={!expanded ? "block" : "none"}>
              <ExpandMoreIcon onClick={handleAccordionToggle} />
            </Box>
          }
          sx={{
            flexDirection: "column",
            "&.Mui-focusVisible": {
              background: "none",
            },
            width: "100%",
          }}
        >
          {!expanded ? (
            <Grid container spacing={2} sx={{ padding: "10px", width: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-1rem",
                  left: "1rem",
                  backgroundColor: "white",
                  padding: "0.25rem 0.50rem",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  {cardData?.employeeFirstName} {cardData?.employeeLastName}
                </Typography>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "1rem",
                  backgroundColor: "white",
                  padding: "0.25rem 0.50rem",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  {cardData?.submittedDate}
                </Typography>
              </div>
              <Grid item xs={12} sm={12} md={6} lg={6} display={"flex"}>
                <TextField
                  label="From"
                  value={dayjs(cardData.fromDate).format("ddd, DD-MMM-YY")}
                  disabled
                  variant="outlined"
                />
                <TextField
                  label="To"
                  value={dayjs(cardData.toDate).format("ddd, DD-MMM-YY")}
                  disabled
                  variant="outlined"
                  sx={{ marginLeft: 2 }}
                />

                <Typography
                  sx={{
                    background: "#008080",
                    color: "white",
                    padding: "15px 10px",
                    borderRadius: "5px",
                    marginLeft: 2,
                    whiteSpace: "nowrap",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {cardData.noOfDays}
                </Typography>
                <Typography
                  sx={{
                    background: "#008080",
                    color: "white",
                    padding: "15px 10px",
                    borderRadius: "5px",
                    marginLeft: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "15px",
                    width: "23%",
                    textAlign: "center",
                  }}
                >
                  {getLeaveType(cardData.leaveMasterId)
                    ?.split(" ")
                    .map((word) => word.charAt(0))
                    .join("")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} display={"flex"}>
                <TextField
                  label="Comments"
                  variant="outlined"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  sx={{ width: "70%" }}
                />
                <Button
                  sx={{
                    background: "#008080",
                    color: "white",
                    marginLeft: 2,
                    padding: "15px",
                    "&:hover": {
                      background: "#006666",
                    },
                  }}
                  onClick={() =>
                    handleApproval("APPROVED", cardData.leaveRequestId)
                  }
                >
                  APPROVE
                </Button>
                <Button
                  sx={{
                    border: "2px solid red",
                    marginLeft: 2,
                    padding: "15px",
                    transition: "background 0.5s",
                    "&:hover": {
                      background: "Red",
                      color: "white",
                    },
                  }}
                  onClick={() =>
                    handleApproval("REJECTED", cardData.leaveRequestId)
                  }
                >
                  REJECT
                </Button>
              </Grid>
              {approval && (
                <>
                  {
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <span style={{ color: "red", position: "absolute" }}>
                        {error[index]}
                      </span>
                    </Grid>
                  }
                </>
              )}
            </Grid>
          ) : (
            <HiddenDataCard
              index={cardData.leaveRequestId}
              cardData={cardData}
              approveRejectLeavesHandler={approveRejectLeavesHandler}
              approval={true}
              error={error}
              leaveRequest={leaveRequest}
              setComments={setComments}
              comments={comments}
            />
          )}
        </AccordionSummary>
        <Box sx={{ width: "100%", textAlign: "center", cursor: "pointer" }}>
          <RemoveIcon onClick={handleAccordionToggle} />
        </Box>
      </Accordion>
    </Box>
  );
};

export default DataCard;
