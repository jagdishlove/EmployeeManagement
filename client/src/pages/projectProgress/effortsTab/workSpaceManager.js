import React from "react";
import TotalHours from "../../../assets/Total Hours.svg";
import LoggedHours from "../../../assets/Logged in hours.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Star from "../../../components/stars/star";
import { useSelector } from "react-redux";
import ratingIcon from "../../../assets/Performance.svg";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import smileAnimated from "../../../assets/No_Data_found.json";
function WorkSpaceManager() {
  const workSpaceData = useSelector(
    (state) => state?.persistData?.workSpace?.workSpaceData
  );
  const { workSpaceDataLoading } = useSelector(
    (state) => state?.persistData?.workSpace
  );

  function parseTimeToHours(timeString) {
    if (!timeString || typeof timeString !== "string") {
      return 0; // Return 0 if timeString is undefined or not a string
    }
    const match = timeString.match(/\d+/g);
    if (!match) {
      return 0; // Return 0 if no digits found in the timeString
    }
    const [hours, minutes] = match.map(Number);
    return hours + minutes / 60;
  }

  const occupancyHours = parseTimeToHours(
    workSpaceData?.projectResourceInfo?.occupancyHours
  );
  const loggedInHours = parseTimeToHours(
    workSpaceData?.projectResourceInfo?.loggedInHours
  );
  let remainingHours = occupancyHours - loggedInHours;

  function formatHoursAndMinutes(hoursDecimal) {
    const hours = Math.floor(hoursDecimal);
    const minutes = Math.round((hoursDecimal - hours) * 60);
    return `${hours} hrs ${minutes} mins`;
  }

  const remainingHoursFormatted = formatHoursAndMinutes(remainingHours);

  const timeParts = remainingHoursFormatted.split(" ");

  const hours = parseInt(timeParts[0]); // Extract hours
  const minutes = parseInt(timeParts[2]); // Extract minutes
  // If remainingHours is NaN or undefined, set it to 0
  if (isNaN(remainingHours) || !isFinite(remainingHours)) {
    remainingHours = 0;
  }

  const performanceRating = isNaN(parseFloat(workSpaceData?.performanceRating))
    ? 0
    : parseFloat(workSpaceData?.performanceRating).toFixed(2);

  const Navigate = useNavigate();

  const handleViewProjectClicked = (id) => {
    Navigate(`/userDetailPage/${id}`);
  };
  return (
    <>
      {workSpaceDataLoading && (
        <Grid
          container
          spacing={0}
          mt={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      )}
      {!workSpaceData ? (
        <>
          {" "}
          <Grid
            container
            spacing={0}
            mt={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              spacing={0}
              mt={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: "#fff",
                height: "400px",
              }}
            >
              <Lottie
                animationData={smileAnimated} // Replace 'yourJsonData' with the JSON data from your file
                loop
                autoplay
                style={{
                  color: "yellow",
                  width: "100px",
                }}
              />

              <Typography
                mt={5}
                sx={{
                  color: "#B2B2B2",
                  fontSize: "28px",
                }}
              >
                No Data Present
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container style={{ justifyContent: "space-between" }}>
          {" "}
          <Grid
            item
            xs={12}
            sm={12}
            md={3.4}
            lg={3.4}
            sx={{
              boxShadow: 2,
              p: 1,
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
            }}
         
          >
            <Grid item xs={4}>
              <Grid item>
                {workSpaceData?.projectResourceInfo?.fileStorage ? (
                  <>
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/png;base64,${workSpaceData?.projectResourceInfo?.fileStorage?.data}`}
                      sx={{
                        border: "2px solid #A4A4A4",
                        height:"70px",
                        width:"70px"
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      sx={{
                        color: "#fff",
                        backgroundColor: " #4813B8",
                        height:"70px",
                        width:"70px"
                      }}
                    >
                      {workSpaceData?.projectResourceInfo?.employeeName?.charAt(
                        0
                      )}
                    </Avatar>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>{workSpaceData?.projectResourceInfo?.employeeName} </b>
              </Typography>
              <Typography>
                <b> Project Name: </b>
                {workSpaceData?.projectResourceInfo?.projectName}
              </Typography>
              <Typography variant="body2">
                <b> ID:</b> Emp {workSpaceData?.projectResourceInfo?.empId}
              </Typography>
              <Box style={{ textAlign: "right" }}>
                {" "}
                <Button
                  style={{
                    color: "#1475E7",
                    textDecoration: "underline",
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    handleViewProjectClicked(
                      workSpaceData?.projectResourceInfo?.userId
                    )
                  }
                >
                  View in detail &gt; &gt;
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={2.8}
            lg={2.8}
            sx={{
              boxShadow: 2,
              p: 1,
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              flexDirection: "column", // Change the direction to column
              alignItems: "center", // Align items to the center
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={2.6}>
                <img src={ratingIcon} alt="Rating Icon" />
              </Grid>
              <Grid item xs={9}>
                
                <Typography fontSize={"20px"} style={{fontWeight:"700", color:"#A4504A"}}>
                <span style={{fontSize:"17px", color:"#000000", fontWeight:"700"}}>Performance</span>  {performanceRating}
                </Typography>
              </Grid>{" "}
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              {" "}
              {/* Add margin top for spacing */}
              <Star value={workSpaceData?.performanceRating} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={2.8}
            lg={2.8}
            sx={{
              boxShadow: 2,
              p: 1,
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container  alignItems="center">
              <Grid item xs={2.6}>
                <img src={TotalHours} />
              </Grid>
              <Grid item xs={9}>
                <b>Total Hours</b>
              </Grid>{" "}
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              {" "}
              <Typography fontSize={"25px"} style={{ fontWeight: "600" }}>
                {" "}
                {workSpaceData?.projectResourceInfo?.occupancyHours}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={2.7}
            lg={2.7}
            sx={{
              boxShadow: 2,
              p: 1,
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container  alignItems="center" spacing={2}>
              <Grid item xs={2.6} >
                <img src={LoggedHours} />
              </Grid>
              <Grid item xs={9} style={{lineHeight:"10px", }}>
                <b style={{fontSize:"16px"}}>Logged In Hours : </b>{" "}
                <Typography fontSize={"18px"} style={{ fontWeight: "600" }}>
                  {" "}
                  {workSpaceData?.projectResourceInfo?.loggedInHours}
                </Typography>
              </Grid>{" "}
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              {" "}
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgressbar
                  value={workSpaceData?.projectResourceInfo?.hoursLeft}
                  styles={{
                    root: { width: "75px" }, // Adjust the width to reduce the size
                    path: {
                      stroke:
                        parseFloat(
                          workSpaceData?.projectResourceInfo?.loggedInHours
                        ) >
                        parseFloat(
                          workSpaceData?.projectResourceInfo?.occupancyHours
                        )
                          ? "#FF0000" // Red color if loggedInHours is greater than occupancyHours
                          : "#4CAF50", // Green color otherwise
                    },
                    text: { fontSize: "14px", fill: "#000" }, // Adjust font size
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    style={{ lineHeight: "15px" ,fontWeight:"bold"}}
                  >
                    {`${Math.abs(hours)} Hrs`}
                    <br />
                    {`${Math.abs(minutes)} Mins`}
                    <br />
                    {parseInt(
                      workSpaceData?.projectResourceInfo?.loggedInHours
                    ) >
                    parseInt(workSpaceData?.projectResourceInfo?.occupancyHours)
                      ? "exceed"
                      : "left"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default WorkSpaceManager;
