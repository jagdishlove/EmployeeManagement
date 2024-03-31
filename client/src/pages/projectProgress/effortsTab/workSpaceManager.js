import React from "react";
import TotalHours from "../../../assets/Total Hours.svg";
import LoggedHours from "../../../assets/Logged in hours.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Star from "../../../components/stars/star";
import { useSelector } from "react-redux";
import ratingIcon from "../../../assets/Performance.svg";

function WorkSpaceManager() {
  const workSpaceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.workSpaceData
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "35px", flexWrap: "nowrap" }}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          borderRadius: "5px",
          padding: "20px",
          marginRight: "8px",
          border: "1px solid #DFDFDF",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            {workSpaceData?.projectResourceInfo?.fileStorage ? (
              <>
                <Avatar
                  alt="Profile Picture"
                  src={`data:image/png;base64,${workSpaceData?.projectResourceInfo?.fileStorage?.data}`}
                  sx={{
                    border: "2px solid #A4A4A4",
                  }}
                />
              </>
            ) : (
              <>
                <Avatar
                  sx={{
                    color: "#fff",
                    backgroundColor: " #4813B8",
                  }}
                >
                  {workSpaceData?.projectResourceInfo?.employeeName?.charAt(0)}
                </Avatar>
              </>
            )}
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">
              {workSpaceData?.projectResourceInfo?.employeeName}{" "}
            </Typography>
            <Typography variant="body1">
              Project Name: {workSpaceData?.projectResourceInfo?.projectName}
            </Typography>
            <Typography variant="body2">
              ID: {workSpaceData?.projectResourceInfo?.empId}{" "}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          border: "1px solid #DFDFDF",
          borderRadius: "5px",
          padding: "20px",
          marginRight: "8px",
          textAlign: "center",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <img src={ratingIcon} />
          </Grid>
          <Grid item xs={4} mt={1}>
            Performance
          </Grid>{" "}
          <Grid item xs={4} mt={1}>
            {workSpaceData?.performanceRating}
          </Grid>
        </Grid>
        <Star value={workSpaceData?.performanceRating} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          border: "1px solid #DFDFDF",
          borderRadius: "5px",
          padding: "20px",
          marginRight: "8px",
          textAlign: "center",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={3}>
            <img src={TotalHours} />
          </Grid>
          <Grid item mt={1} xs={9}>
            Total Hours
          </Grid>{" "}
        </Grid>
        <Typography>
          {workSpaceData?.projectResourceInfo?.occupancyHours}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          border: "1px solid #DFDFDF",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <img src={LoggedHours} />
          </Grid>
          <Grid item xs={8} mt={1}>
            Logged In Hours :{" "}
            {workSpaceData?.projectResourceInfo?.loggedInHours}
          </Grid>{" "}
        </Grid>
        <Box
          mt={-2}
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgressbar
            value={workSpaceData?.projectResourceInfo?.loggedInHours}
            text={`${workSpaceData?.projectResourceInfo?.loggedInHours} hrs left`}
            styles={{
              root: { width: "70px" }, // Adjust the width to reduce the size
              path: { stroke: "#4CAF50" }, // Adjust path color if needed
              text: { fontSize: "10px", fill: "#000" }, // Adjust font size
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default WorkSpaceManager;
