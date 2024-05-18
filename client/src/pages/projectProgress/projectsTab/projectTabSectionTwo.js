import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Deviations from "../../../assets/Deviations.svg";
import Budget from "../../../assets/Budget.svg";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";
import TotalHours from "../../../assets/Total Hours.svg";
import TeamMember from "../../../assets/Team_Members.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import Loggedinhours from "../../../assets/Logged in hours.svg";
import { useSelector } from "react-redux";
const ProjectTabSectionTwo = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );

  // Checking if dashboardProjectdetails and totalHours are defined
  if (!dashboardProjectdetails?.totalHours || !dashboardProjectdetails?.time) {
    return null; // or you can return a default value or message
  }

  const loggedInHours = parseInt(dashboardProjectdetails.loggedInHours);
  const totalHours = parseInt(dashboardProjectdetails.totalHours);

  // Extracting only the numerical part from the string
  const deviations = parseFloat(dashboardProjectdetails.deviations || 0);

 // Round the deviations value to two decimal places with custom rounding
let roundedDeviations = (Math.round(deviations * 100) / 100).toFixed(2);
const lastTwoDigitss = Math.floor((deviations * 100) % 100);
if (lastTwoDigitss < 50) {
    // Round down
    roundedDeviations = (Math.floor(deviations * 100) / 100).toFixed(2);
} else {
    // Round up
    roundedDeviations = (Math.ceil(deviations * 100) / 100).toFixed(2);
}


  // Extracting only the numerical part from the string
  const budget = parseFloat(dashboardProjectdetails.budget || 0);

  let  roundedBudget = (Math.round(budget * 100) / 100).toFixed(2);
  const lastTwoDigits = Math.floor((budget * 100) % 100);
  if (lastTwoDigits < 50) {
      // Round down
      roundedBudget = (Math.floor(budget * 100) / 100).toFixed(2);
  } else {
      // Round up
      roundedBudget = (Math.ceil(budget * 100) / 100).toFixed(2);
  }

  const timeParts = dashboardProjectdetails.hoursLeft.split(" ");

  const hours = parseInt(timeParts[0]); // Extract hours
  const minutes = parseInt(timeParts[2]); // Extract minutes

  return (
    <Grid
      container
      style={{ justifyContent: "space-between", paddingTop: "10px" }}
    >
      <Grid
        item
        xs={6}
        sm={6}
        md={2.3}
        lg={2.3}
        sx={{
          boxShadow: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius:"5px"
        }}
      >
        {/* First Grid container for icon and text */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          spacing={5}
          xs={12} // Occupies full width on extra small screens
        >
          <Grid item xs={3}>
            <img src={Deviations} alt="Deviation Icon" />
          </Grid>
          <Grid item xs={9}>
            <Typography marginLeft={"5px"}>
              <strong>Deviations</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* Second Grid container for percentage and image */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          xs={12} // Occupies full width on extra small screens
          style={{ textAlign: "center" }} // Center align text content
        >
          <Grid
            item
            xs={12}
            gap={0.5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">{roundedDeviations || 0}%</Typography>
            {roundedDeviations < 0 ? (
              <img
                src={upArrow}
                alt="Up Arrow Icon"
                height={35}
                style={{ filter: "green" }}
              />
            ) : (
              <img
                src={downArrow}
                alt="Down Arrow Icon"
                height={35}
                style={{ filter: "red" }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={6}
        sm={6}
        md={2.2}
        lg={2.2}
        sx={{
          boxShadow: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius:"5px"
        }}
      >
        {/* First Grid container for icon and text */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          spacing={5}
          xs={12} // Occupies full width on extra small screens
        >
          <Grid item xs={3}>
            <img src={Budget} alt="budget" />
          </Grid>
          <Grid item xs={9}>
            <Typography marginLeft={"5px"}>
              {" "}
              <strong>Budget</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          xs={12} // Occupies full width on extra small screens
          style={{ textAlign: "center" }} // Center align text content
        >
          <Grid
            item
            xs={12}
            gap={0.5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">{roundedBudget || 0}%</Typography>
            {roundedBudget > 100 ? (
              <img
                src={downArrow}
                alt="Down Arrow Icon"
                height={35}
                style={{ filter: "red" }}
              />
            ) : (
              <img
                src={upArrow}
                alt="Up Arrow Icon"
                height={35}
                style={{ filter: "green" }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={6}
        sm={6}
        md={2.2}
        lg={2.2}
        sx={{
          boxShadow: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius:"5px"
        }}
      >
        {/* First Grid container for icon and text */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          spacing={5}
          xs={12} // Occupies full width on extra small screens
        >
          <Grid item xs={3}>
            <img src={TeamMember} alt="resources" />
          </Grid>
          <Grid item xs={9}>
            <Typography marginLeft={"5px"}>
              {" "}
              <strong>Resources</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* Second Grid container for percentage and image */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          xs={12} // Occupies full width on extra small screens
          style={{ textAlign: "center" }} // Center align text content
        >
          <Grid
            item
            xs={12}
            gap={0.5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">
              {dashboardProjectdetails?.totalResources}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={6}
        sm={6}
        md={2.4}
        lg={2.4}
        sx={{
          boxShadow: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius:"5px"
        }}
      >
        {/* First Grid container for icon and text */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          spacing={5}
          xs={12} // Occupies full width on extra small screens
        >
          <Grid item xs={3}>
            <img src={TotalHours} alt="Total Hours" />
          </Grid>
          <Grid item xs={9}>
            <Typography marginLeft={"5px"}>
              {" "}
              <strong>Total Hours</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* Second Grid container for percentage and image */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          xs={12} // Occupies full width on extra small screens
          style={{ textAlign: "center" }} // Center align text content
        >
          <Grid
            item
            xs={12}
            gap={0.5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2">
              {" "}
              {dashboardProjectdetails.totalHours}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={6}
        sm={6}
        md={2.5}
        lg={2.5}
        sx={{
          boxShadow: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius:"5px"
        }}
      >
        {/* First Grid container for icon and text */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          spacing={5}
          xs={12} // Occupies full width on extra small screens
        >
          <Grid item xs={3}>
            <img src={Loggedinhours} alt="Logged In Hours" />
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {" "}
              <strong>Logged In Hours : </strong>{" "}
              <b>{dashboardProjectdetails.loggedInHours || 0}</b>
            </Typography>
          </Grid>
        </Grid>

        {/* Second Grid container for percentage and image */}
        <Grid
          container
          item
          display="flex"
          alignItems="center"
          xs={12} // Occupies full width on extra small screens
          style={{ textAlign: "center" }} // Center align text content
        >
          <Grid
            item
            xs={12}
            gap={0.5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgressbar
                value={dashboardProjectdetails.loggedInHours}
                styles={{
                  root: { width: "100px" },
                  path: {
                    stroke:
                      loggedInHours >
                     totalHours
                        ? "#FF0000"
                        : "#4CAF50",
                  },
                  text: {
                    fontSize: "12px",
                    fill: "#000",
                    whiteSpace: "pre-line",
                  },
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
                  style={{ lineHeight: "15px" , fontWeight:"bold"}}
                >
                  {`${Math.abs(hours)} Hrs`}
                  <br />
                  {`${Math.abs(minutes)} Mins`}
                  <br />
                  {parseInt(dashboardProjectdetails.loggedInHours) >
                  parseInt(dashboardProjectdetails.totalHours)
                    ? "exceed"
                    : "left"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectTabSectionTwo;
