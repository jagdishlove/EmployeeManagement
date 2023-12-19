import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

const HiddenDataCard = ({ cardData, approveRejectLeavesHandler }) => {

  const [comment, setComment] = useState(''); 

  const [error, setError] = useState('');

  const masterData = useSelector((state) => state?.persistData?.masterData)

  

  const handleApproval = (status) => {
    if (!comment.trim()) {
      setError('Please add details in the comments section.');
      return;
    }
    setError('');
    approveRejectLeavesHandler(cardData.leaveRequestId, status, comment);
  };

  const getLeaveType = (leaveMasterId) => {
    const leaveTypeObject = masterData?.leaveTypes?.find(
      (data) => data.leaveMasterId === leaveMasterId
    );
    return leaveTypeObject ? leaveTypeObject.leaveType : '';
  };

  const sessionValue = (sessionName) => {
    const sessionObject = masterData?.sessionList?.find(
      (session) => session.sessionName === sessionName
    );
    return sessionObject ? sessionObject.sessionValue : sessionName;
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
            value={dayjs(cardData.fromDate).format('ddd, MMM D, YYYY')}
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            fullWidth
            label="To"
            value={dayjs(cardData.toDate).format('ddd, MMM D, YYYY')}
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
          {getLeaveType(cardData.leaveMasterId)}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container xs={12} sm={12} md={4} lg={4} gap={2} style={{height:'100px'}}>
        <TextField
          fullWidth
          label="Comments"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
        style={{ height: "100%",position: "relative"  }}
      >
        <Grid
          item
          xs={12}
          style={{ height: "47%", display: "flex", justifyContent: "center",position: "relative"  }}
        >
          <Button
            sx={{
              border:"1px solid green",
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
              "&:hover" : {
                background: "#006666", 
                color:'white'
              }
            }}
            onClick={() =>
              handleApproval("APPROVED")
            }
          >
            APPROVE
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
            position: "relative" 
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
                color:'white' 

              },
            }}
            onClick={() =>
              handleApproval("REJECTED")
            }
          >
            REJECT
          </Button>
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
        style={{ marginTop: 10, position: "relative" }}
      >
        {error && (
          <p
            className="error-message"
            style={{
              color: "red",
              marginLeft: 20,
              fontSize: "14px",
              textAlign: "left",
              position: "absolute",
              top: 0, // Adjust the top property
              left: 0,
              width: "100%", // Ensure the message spans the entire width
            }}
          >
            {error}
          </p>
        )}
      </Grid>

    </Grid>
    
  );
};

export default HiddenDataCard;

