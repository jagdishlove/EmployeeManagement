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
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import HiddenDataCard from "./HiddenDataCard";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";

const DataCard = ({
  cardData,
  approveRejectLeavesHandler,
  approval,
  leaveRequest,
  error,
  index,
  superAdmin,
  onCommentChange,
  adminComments,
  onCardSelect,
  selectedCards,
  handleCheckboxChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const handleApproval = async (status, leaveRequestId) => {
    try {
      setLoading(true);
      await approveRejectLeavesHandler(leaveRequestId, status, comments);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentInputChange = (e) => {
    setComments(e.target.value);
    if (superAdmin) {
      onCommentChange(e.target.value);
    }
  };
  const masterData = useSelector(
    (state) => state?.persistData?.loginDetails?.masterData
  );

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
    <Box sx={{ marginTop: "25px", marginBottom: "50px" }}>
      <Accordion
        elevation={0}
        sx={{
          border: "2px solid #008080",
        }}
        expanded={expanded}
        style={{ marginBottom: "50px" }}
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
           
           
          }}
        >
          {!expanded ? (
            <Grid
              container
              spacing={isMobile ? 5 : 3}
              sx={{ padding: "10px", justifyContent:"center"}}
            >
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
              </div>{" "}
              {superAdmin ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "-0.5rem",
                      right: "0rem",

                      padding: "0.50rem 0.50rem",
                    }}
                  >
                    <Checkbox
                      checked={selectedCards[cardData.leaveRequestId] || false}
                      onChange={() =>
                        handleCheckboxChange(cardData.leaveRequestId)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
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
                  sx={{ marginLeft: isMobile ? "5px" : "15px" }}
                />

                <Typography
                  sx={{
                    background: "#008080",
                    color: "white",
                    padding: "15px 10px",
                    borderRadius: "5px",
                    marginLeft: isMobile ? "5px" : "15px",
                    whiteSpace: "nowrap",
                    width: isMobile ? "none" : "20%",
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
                    marginLeft: isMobile ? "5px" : "15px",
                    whiteSpace: "nowrap",
                    // overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "15px",
                    width: isMobile ? "none" : "23%",
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
                  placeholder="APPROVED"
                  variant="outlined"
                  value={comments || adminComments}
                  InputLabelProps={{
                    shrink: true,
                    htmlFor: "comments",
                  }}
                  onChange={handleCommentInputChange}
                  sx={{ width: "70%" }}
                />
                <Button
                  sx={{
                    background: "#008080",
                    color: "white",
                    marginLeft:isMobile ? "5px" : "15px",
                    padding: "15px",
                    "&:hover": {
                      background: "#006666",
                    },
                    fontSize: isMobile ? "12px" : "16px",
                  }}
                  onClick={() =>
                    handleApproval("APPROVED", cardData.leaveRequestId)
                  }
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Loading..." : "APPROVE"}
                </Button>

                <Button
                  sx={{
                    border: "2px solid red",
                    marginLeft: isMobile ? "5px" : "15px",
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
              {(approval || superAdmin) && (
                <>
                  {
                    <Grid style={{ width: "100%" }}>
                      <p
                        style={{
                          color: "red",
                          position: "absolute",
                          width: "100%",
                          lineHeight: "20px",
                          left: "30px",
                          bottom: "-2px",
                        }}
                      >
                        {error?.[index]}
                      </p>
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
              onCardSelect={onCardSelect}
              superAdmin={superAdmin}
              selectedCards={selectedCards}
              handleCheckboxChange={handleCheckboxChange}
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
