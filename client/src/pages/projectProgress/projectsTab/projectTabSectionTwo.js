import { Grid, Typography } from "@mui/material";
import React from "react";
import Deviations from "../../../assets/Deviations.svg";
import Budget from "../../../assets/Budget.svg";
import upArrow from "../../../assets/upArrow.png";
import downArrow from "../../../assets/downArrow.png";
import TotalHours from "../../../assets/Total Hours.svg";
import TeamMember from "../../../assets/Team Members.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import Loggedinhours from "../../../assets/Logged in hours.svg";
import { useSelector } from "react-redux";
const ProjectTabSectionTwo = () => {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );
  
  // Check if dashboardProjectdetails.budget is NaN, if NaN set it to 0
  const budgetValue = isNaN(dashboardProjectdetails?.budget)
    ? 0
    : dashboardProjectdetails?.budget;

  // Checking if dashboardProjectdetails and totalHours are defined
  if (!dashboardProjectdetails?.totalHours || !dashboardProjectdetails?.time) {
    return null; // or you can return a default value or message
  }
  if (!dashboardProjectdetails?.loggedInHours) {
    return null; // or you can return a default value or message
  }

  // Extracting only the hours part from the string
  const hours = parseInt(dashboardProjectdetails.totalHours.split(" ")[0]);
  const percentage = parseInt(dashboardProjectdetails.time.split(" ")[0]);

  const loggedInHours = parseInt(
    dashboardProjectdetails.loggedInHours.split(" ")[0]
  );
  return (
    <div>
      <Grid
        container
        style={{ justifyContent: "space-between", paddingTop: "20px" }}
      >
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
            backgroundColor:"#ffffff"
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
              <Typography variant="h1">
                {dashboardProjectdetails?.deviations}%
              </Typography>
              <img src={upArrow} alt="Up Arrow Icon" height={35} />
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
            backgroundColor:"#ffffff"
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
              <Typography variant="h1">{budgetValue}%</Typography>
              <img src={downArrow} alt="Down Arrow Icon" height={35} />
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
            backgroundColor:"#ffffff"
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
              <Typography variant="h1">
                {dashboardProjectdetails?.totalResources}
              </Typography>
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
            backgroundColor:"#ffffff"
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
              <Typography variant="h2"> {hours}</Typography>
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
            backgroundColor:"#ffffff"
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
                <strong>Logged In Hours : </strong> {loggedInHours}
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
              <CircularProgressbar
                value={percentage}
                text={`${percentage} hrs left `}
                styles={{
                  root: { width: "70px" }, // Adjust the width to reduce the size
                  path: { stroke: "#4CAF50" }, // Adjust path color if needed
                  text: { fontSize: "14px", fill: "#000" }, // Adjust font size
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTabSectionTwo;
