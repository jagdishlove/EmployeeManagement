import { CloudDownload } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileAction } from "../../../redux/actions/leaves/approvalLeaveAction";
import Checkbox from "@mui/material/Checkbox";

const HiddenDataCard = ({
  cardData,
  approveRejectLeavesHandler,
  approval,
  error,
  index,
  setComments,
  comments,

  superAdmin,
  handleCheckboxChange,
  selectedCards,
}) => {
  const masterData = useSelector(
    (state) => state?.persistData?.loginDetails?.masterData
  );

  const [loading, setLoading] = useState(false);


  const handleApproval = async (status, leaveRequestId) => {
    try {
      setLoading(true);
      await approveRejectLeavesHandler(leaveRequestId, status, comments);
    } finally {
      setLoading(false);
    }
  };
  

  const dispatch = useDispatch();

  const getLeaveType = (leaveMasterId) => {
    const leaveTypeObject = masterData?.leaveTypesForView?.find(
      (data) => data.leaveMasterId === leaveMasterId
    );
    return leaveTypeObject ? leaveTypeObject.leaveType : "";
  };

  const sessionValue = (sessionName) => {
    const sessionObject = masterData?.sessionList?.find(
      (session) => session.sessionName === sessionName
    );
    return sessionObject ? sessionObject.sessionValue : sessionName;
  };

  const handleDownload = (file) => {
    dispatch(downloadFileAction(file, cardData.fileName));
  };

  return (
    <Grid container spacing={2} style={{ padding: "10px" }}>
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
      <div
        style={{
          position: "absolute",
          top: "-0.5rem",
          right: "0rem",

          padding: "0.50rem 0.50rem",
        }}
      >
        {superAdmin ? (
          <Checkbox
            checked={
              (selectedCards &&
                cardData &&
                selectedCards[cardData.leaveRequestId]) ||
              false
            }
            onChange={() =>
              handleCheckboxChange(cardData && cardData.leaveRequestId)
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        ) : null}
      </div>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={4}
        lg={4}
        display={"flex"}
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            fullWidth
            label="From"
            value={dayjs(cardData.fromDate).format("ddd, DD-MMM-YY")}
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            fullWidth
            label="To"
            value={dayjs(cardData.toDate).format("ddd, DD-MMM-YY")}
            variant="outlined"
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            fullWidth
            value={sessionValue(cardData.fromSession)}
            label="Session"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            fullWidth
            label="Session"
            value={sessionValue(cardData.toSession)}
            variant="outlined"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            disabled
            multiline
            rows={3}
            fullWidth
            label="Reason"
            value={cardData.comments}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Grid
          item
          xs={12}
          style={{ height: "48%", display: "flex", justifyContent: "center" }}
        >
          <Typography
            sx={{
              background: "#008080",
              color: "white",
              borderRadius: "5px",
              whiteSpace: "nowrap",
              fontSize: "18px",
              textWrap: "wrap",
              wordBreak: "break-word",
              textAlign: "center",
              width: "80%",
              padding: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cardData.noOfDays} Days
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            height: "45%",
            display: "flex",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              background: "#008080",
              color: "white",
              padding: "15px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
              fontSize: "18px",
              textWrap: "wrap",
              textAlign: "center",
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getLeaveType(cardData.leaveMasterId) ===
              "Adoption Leave For Female" ||
            getLeaveType(cardData.leaveMasterId) === "Adoption Leave For Male"
              ? "Adoption Leave"
              : getLeaveType(cardData.leaveMasterId)}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={4}
        lg={4}
        gap={2}
        style={{ height: "100px" }}
      >
        <TextField
          fullWidth
          label="Comments"
          placeholder="APPROVED"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            htmlFor: "comments",
          }}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          multiline
          rows={10}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={2}
        lg={2}
        gap={3}
        style={{ height: "100%", position: "relative" }}
      >
        <Grid
          item
          xs={12}
          style={{
            height: "47%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Button
            sx={{
              border: "1px solid green",
              color: "black",
              padding: "15px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
              fontSize: "18px",
              textWrap: "wrap",
              textAlign: "center",
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "#006666",
                color: "white",
              },
            }}
            onClick={() => handleApproval("APPROVED", cardData.leaveRequestId)}
            disabled={loading}
          >
            {loading ? "Loading..." : "APPROVE"}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            height: "47%",
            display: "flex",
            marginTop: "10px", // Add margin-top to create space
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Button
            sx={{
              border: "2px solid red",
              padding: "15px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
              fontSize: "18px",
              textWrap: "wrap",
              textAlign: "center",
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "Red",
                color: "white",
              },
            }}
            onClick={() => handleApproval("REJECTED", cardData.leaveRequestId)}
          >
            REJECT
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        sm={12}
        md={4}
        lg={4}
        display={"inline-flex"}
        flexDirection={"row"}
        style={{ lineHeight: "20px", marginLeft: "20px" }}
      >
        <Grid item xs={12} style={{ marginTop: "-20px" }}>
          {cardData.fileName && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ marginRight: "8px" }}
                onClick={() => handleDownload(cardData?.fileDownloadLink)}
              >
                <CloudDownload />
              </IconButton>
              <Typography>{cardData.fileName}</Typography>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          {cardData.fileName && (
            <Typography
              style={{
                fontSize: "10px",
                marginTop: "-10px",
              }}
            >
              please click on the icon to download the file
            </Typography>
          )}
        </Grid>

        {(approval || superAdmin) && (
          <>
            {
              <Grid item xs={12}>
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {error?.[index]}
                </p>
              </Grid>
            }
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default HiddenDataCard;
